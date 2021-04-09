import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ServiceService} from './service.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  htmlFromServer: string;
  questionsFromServer: Array<{id, text}>;
  isSelectStarted = false;
  componentDestroyed: Subject<void> = new Subject<void>();

  arrElementlisten: Array<Element> = [];
  point = [];

  unlistenMouseClick: () => void;
  listenMouseEnter: (event: MouseEvent, i) => void;
  unlistenMouseEnterArr: Array<() => void> = [];
  listenMouseLeave: (event: MouseEvent, i) => void;
  unlistenMouseLeaveArr: Array<() => void> = [];

  @ViewChild('answersList', { static: false }) answersList: ElementRef;
  @ViewChild('questionsList', { static: false }) questionsList: ElementRef;

  constructor(
      private serviceService: ServiceService,
      private renderer: Renderer2
  ) {}

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
    this.stopSelectAnswer();
  }

  ngOnInit(): void {
    // this.addListener();

    this.serviceService.getData()
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe( ({html, questions}) => {
          this.htmlFromServer = html;
          this.questionsFromServer = questions;
        });
  }

  public startSelectAnswer(questionsId: number): void {
    if (this.isSelectStarted) {
      return;
    }
    this.isSelectStarted = true;
    const listAnswers: HTMLCollectionOf<Element> = this.answersList.nativeElement.getElementsByTagName('div');

    this.listenMouseEnter = (eventMouseEnter: MouseEvent, i) => {
      const target: EventTarget = eventMouseEnter.target || eventMouseEnter.srcElement || eventMouseEnter.currentTarget;
      this.renderer.setStyle(this.arrElementlisten[i].firstElementChild, 'color', 'blue');
      this.unlistenMouseClick = this.renderer.listen(target, 'mouseup', eventMouseUp => this.openModalDialog(questionsId, eventMouseUp));
    };
    this.listenMouseLeave = (eventMouseLeave: MouseEvent, i) => {
      this.renderer.removeStyle(this.arrElementlisten[i].firstElementChild, 'color');
      // this.removeTableBorder(eventMouseLeave, this.arrElementlisten[i].firstElementChild);
      this.unlistenMouseClick();
    };

    for (let i = 0; i < listAnswers.length; i++) {
      this.arrElementlisten.push(listAnswers[i]);
      const unlistenMouseEnter = this.renderer.listen(
          listAnswers[i].firstElementChild, 'mouseenter', (eventMouseEnter: MouseEvent) => this.listenMouseEnter(eventMouseEnter, i)
      );
      this.unlistenMouseEnterArr.push(unlistenMouseEnter);

      const unlistenMouseLeave = this.renderer.listen(
          listAnswers[i].firstElementChild, 'mouseleave', (eventMouseLeave: MouseEvent) => this.listenMouseLeave(eventMouseLeave, i)
      );
      this.unlistenMouseLeaveArr.push(unlistenMouseLeave);
    }
  }

  private stopSelectAnswer(): void {
    this.isSelectStarted = false;
    this.unlistenMouseClick();
    for (let i = 0; i < this.unlistenMouseEnterArr.length; i++) {
      this.unlistenMouseEnterArr[i]();
    }
    for (let i = 0; i < this.unlistenMouseLeaveArr.length; i++) {
      this.unlistenMouseLeaveArr[i]();
    }
  }

  private openModalDialog(questionsId: number, mouseEvent: MouseEvent): void {
    this.stopSelectAnswer();

    const numberQuestionsInArr = questionsId - 1;
    // @ts-ignore
    const target: HTMLTextAreaElement = mouseEvent.target || mouseEvent.srcElement || mouseEvent.currentTarget;

    const textPopup = `
      ${this.questionsFromServer[numberQuestionsInArr].text}
      ${target.innerText}
    `;
    const res: boolean = confirm(textPopup);
    if (res) {
      const formatData = {questionId: questionsId, selectedText: target.innerText};
      this.serviceService.sendDataOnServer(formatData);
    }
  }
}
