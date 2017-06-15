var numberTask = document.location.search[3];
var taskFile, answerFile, taskText;

numberTask = +numberTask;
setValueByTaskNumber();

var textHelp = readFile(taskText);
document.getElementById('template').innerHTML = textHelp;
help();

var editorContent = readFile(taskFile);

var editor = ace.edit("editor");
editor.setTheme("ace/theme/dreamweaver");
editor.getSession().setMode("ace/mode/javascript");
editor.setValue(editorContent);

var iframeAnswer = document.getElementById("frame-answer");
var toCheckDoc = iframeAnswer.contentDocument || iframeAnswer.contentWindow.document;

var iframeCorrect = document.getElementById("frame-correct");
var correctDoc = iframeCorrect.contentDocument || iframeCorrect.contentWindow.document;

var correctCode = readFile(answerFile);

toCheckDoc.open();
toCheckDoc.write(editor.getValue());
toCheckDoc.close();

editor.getSession().on("change", function() {
  toCheckDoc.open();
  toCheckDoc.write(editor.getValue());
  toCheckDoc.close();
});

correctDoc.open();
correctDoc.write(correctCode);
correctDoc.close();

function toCheckScreen() {
  var imgCheck, imgCorrect, message;
  var elementCheck = document.getElementById("check");
  var elementNext = document.getElementById("btn-next");
  elementCheck.classList.remove("notification-suc");
  elementCheck.classList.remove("notification-fail");

  html2canvas(toCheckDoc.body, {
    onrendered: function(canvasCheck) {
      imgCheck = canvasCheck.toDataURL("image/png");
      html2canvas(correctDoc.body, {
        onrendered: function(canvasTrue) {
        imgCorrect = canvasTrue.toDataURL("image/png");
        resemble(imgCorrect).compareTo(imgCheck).onComplete(function (data) {
          var masmatch_percentage = data.rawMisMatchPercentage;
          if (masmatch_percentage == 0) {
            message = 'All right';
            elementCheck.classList.add("notification-suc");
            elementNext.classList.add("go-next-active");
          } else {
            message = 'Failed';
            elementCheck.classList.add("notification-fail");
            elementNext.classList.remove("go-next-active");
          }
          document.getElementById('check').innerHTML = message;
         });
        }
      });
    }
  });
}

function help() {
  var elementWindowHelp = document.getElementById("window-help");
  var elementInactiveScreen = document.getElementById("inactive-screen");
  elementWindowHelp.classList.add("modal-content");
  elementWindowHelp.classList.remove("invisible");
  elementInactiveScreen.classList.add("modal-overlay");
}

function closeHelp() {
  var elementWindowHelp = document.getElementById("window-help");
  var elementInactiveScreen = document.getElementById("inactive-screen");
  elementWindowHelp.classList.remove("modal-content");
  elementWindowHelp.classList.add("invisible");
  elementInactiveScreen.classList.remove("modal-overlay");
}

function readFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  var fileText;
  rawFile.onreadystatechange = function () {
    if(rawFile.readyState === 4) {
      if(rawFile.status === 200 || rawFile.status == 0) {
        fileText = rawFile.responseText;
      }
    }
  };
  rawFile.send(null);
  return fileText;
}

function goNextTask() {
  switch (numberTask) {
    case 1:
      document.location.href = "task.html?t=2";
      break;
    case 2:
      document.location.href = "task.html?t=3";
      break;
    case 3:
      document.location.href = "task.html?t=4";
      break;
    case 4:
      document.location.href = "task.html?t=5";
      break;
    case 5:
      document.location.href = "";
      break;
  }
}

function goD3Site() {
    var win = window.open("https://d3js.org", '_blank');
    win.focus();
}

function setValueByTaskNumber() {
  switch(numberTask) {
    case 1:
      document.getElementById('task-name').innerHTML = "Percentage of survivors";
      taskFile = "../task/task1/t1_task.html";
      answerFile = "../task/task1/t1_answer.html";
      taskText = "../task/task1/t1_text_task.html";
      break;
    case 2:
      document.getElementById('task-name').innerHTML = "Percentage of survivors by gender";
      taskFile = "../task/task2/t2_task.html";
      answerFile = "../task/task2/t2_answer.html";
      taskText = "../task/task2/t2_text_task.html";
      break;
    case 3:
      document.getElementById('task-name').innerHTML = "Classes of people";
      taskFile = "../task/task3/t3_task.html";
      answerFile = "../task/task3/t3_answer.html";
      taskText = "../task/task3/t3_text_task.html";
      break;
    case 4:
      document.getElementById('task-name').innerHTML = "Number of people";
      taskFile = "../task/task4/t4_task.html";
      answerFile = "../task/task4/t4_answer.html";
      taskText = "../task/task4/t4_text_task.html";
      break;
    case 5:
      document.getElementById('task-name').innerHTML = "Number of people by age";
      var elementNextTask = document.getElementById("btn-next");
      elementNextTask.classList.add("invisible");
      taskFile = "../task/task5/t5_task.html";
      answerFile = "../task/task5/t5_answer.html";
      taskText = "../task/task5/t5_text_task.html";
      break;
  }
}
