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
  questionsFromServer: Array<{ id, text }>;
  isSelectStarted = false;
  componentDestroyed: Subject<void> = new Subject<void>();

  arrElementlisten: Array<Element> = [];
  wrapTableBorder: Element;

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
    this.serviceService.getData()
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(({ html, questions }) => {
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
      this.drawTableBorder(this.arrElementlisten[i].firstElementChild);
      this.unlistenMouseClick = this.renderer.listen(target, 'mouseup', eventMouseUp => this.openModalDialog(questionsId, eventMouseUp));
    };
    this.listenMouseLeave = (eventMouseLeave: MouseEvent, i) => {
      this.renderer.removeStyle(this.arrElementlisten[i].firstElementChild, 'color');
      this.removeTableBorder();
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
    this.removeTableBorder();

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
      const formatData = { questionId: questionsId, selectedText: target.innerText };
      this.serviceService.sendDataOnServer(formatData);
    }
  }

  private drawTableBorder(element: Element): void {
    const rect = element.getBoundingClientRect();

    this.wrapTableBorder = this.renderer.createElement('div');
    const wrapStyles = {
      'display': 'block',
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'width': '100%',
      'height': '100%',
      'pointer-events': 'none',
    };
    Object.keys(wrapStyles).forEach(newStyle => {
      this.renderer.setStyle(this.wrapTableBorder, `${newStyle}`, wrapStyles[newStyle]);
    });


    const heightDiv = this.renderer.createElement('div');
    const heightStyles = {
      'display': 'block',
      'position': 'absolute',
      'top': '0',
      'left': rect.left + 'px',
      'width': (rect.right - rect.left) + 'px',
      'height': '100%',
      'border-color': '#86dfff',
      'border-style': 'dashed',
      'border-width': '1px',
    };
    Object.keys(heightStyles).forEach(newStyle => {
      this.renderer.setStyle(heightDiv, `${newStyle}`, heightStyles[newStyle]);
    });


    const widthDiv = this.renderer.createElement('div');
    const widthStyles = {
      'display': 'block',
      'position': 'absolute',
      'left': '0',
      'width': '100%',
      'top': rect.top + 'px',
      'height': (rect.bottom - rect.top) + 'px',
      'border-color': '#86dfff',
      'border-style': 'dashed',
      'border-width': '1px',
    };
    Object.keys(widthStyles).forEach(newStyle => {
      this.renderer.setStyle(widthDiv, `${newStyle}`, widthStyles[newStyle]);
    });

    const point = [heightDiv, widthDiv];
    point.forEach(el => {
      this.renderer.appendChild(this.wrapTableBorder, el);
    });

    this.renderer.appendChild(document.body, this.wrapTableBorder);
  }

  private removeTableBorder(): void {
    this.renderer.removeChild(document.body, this.wrapTableBorder);
  }
}
