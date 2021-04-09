# Test Description
1. Use Angular (any that you prefer)

2. Create front-end service and service with dummy data OR .NET backend web api which return next dummy object: 
    ``` js
    const data = {
        html: `<div>
        <span>Ivan Ivanov</span>
        <div>Country:<span>UA</span></div>
        <div>Postcode:<b>65000</b></div>
       </div>`,
        questions: [
            {
                id: 1,
                text: 'Where is fullname?'
            },
            {
                id: 2,
                text: `Where is the country?`
            },
            {
                id: 3,
                text: `Where is the postcode?`
            }
        ]
    };
    ```

3. Create an HTML view that will bind data from the service (step 2).
    
    3.1 Need show html markup received from service
    
    3.2 Need show list of questions received from service 

#### Implement next use case
1. User click on one of questions
2. After clicking on the question the user is activating the selection mode. 
    The goal for the user is to select an html element with the text that corresponds to the question.
    For example: the question is ‘Where is the country?’, so the user must select the text ‘UA’.
    In selection mode, on mouse move, the html element under the mouse cursor must be highlighted by showing
    the borders of the element, like using the Google Chrome Developer toolbar (F12) inspector tool (CTRL + SHIFT + C).
    See image below for example:
    ![image info](http://g.recordit.co/YEzroACvaf.gif)

3. After clicking on a proper html element that corresponds to the question, must be displayed a popup dialog with next info:
3.1 Question text
3.2 Html text of selected element.
3.3 Cancel button
3.4 Ok button
4. After user is clicking Ok, you should call dummy service (OR create some web api service for that) and pass object of next object:
```
{
    questionId: <PLACE_HERE_QUESTION_ID>,
    selectedText: ‘<PLACE_HERE_SELECTED_HTML_ELEMENT_TEXT>,
}
```

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
