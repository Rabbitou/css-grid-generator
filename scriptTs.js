document.addEventListener("DOMContentLoaded", function () {
  var start;
  var divCounts = 1;
  var dialog = document.querySelector("dialog");
  var showBtn = document.querySelector(".showCode");
  var codeDiv = document.querySelector(".codeDiv");
  var doneBtn = document.querySelector(".doneBtn");
  var resetBtn = document.querySelector(".resetGrid");
  var gridLayout = document.querySelector(".gridLayout");
  var formSetting = document.querySelector("#formSettings");
  var showCssHtml = document.querySelector(".showHtmlCss");
  var cssContainer = document.createElement("p");
  cssContainer.style.color = "#F76B15";
  var divsCss = document.createElement("p");
  var divsHtml = document.createElement("p");
  var createDivsHtml = function (num) {
    var firstSpan = document.createElement("span");
    firstSpan.innerHTML += '&lt;div class="parent"&gt;<br />';
    divsHtml.appendChild(firstSpan);
    for (var i = 1; i < num; i++) {
      divsHtml.appendChild(appendDivHtml(i));
    }
    var lastDiv = document.createElement("span");
    lastDiv.innerHTML += "".concat(
      divCounts === 1 ? "<br />" : "",
      "&lt;/div&gt;<br />"
    );
    divsHtml.appendChild(lastDiv);
  };
  showCssHtml === null || showCssHtml === void 0
    ? void 0
    : showCssHtml.addEventListener("click", function () {
        if (showCssHtml.dataset.current === "css") {
          clearCssContainer();
          clearDivsHtml();
          createDivsHtml(divCounts);
          cssContainer.appendChild(divsHtml);
          showCssHtml.dataset.current = "html";
        } else if (showCssHtml.dataset.current === "html") {
          clearCssContainer();
          clearDivsHtml();
          initialiseContainer();
          cssContainer.appendChild(divsCss);
          showCssHtml.dataset.current = "css";
        }
      });
  resetBtn === null || resetBtn === void 0
    ? void 0
    : resetBtn.addEventListener("click", function () {
        clearGrid();
        initialiseMainGrid();
      });
  doneBtn === null || doneBtn === void 0
    ? void 0
    : doneBtn.addEventListener("click", function () {
        dialog === null || dialog === void 0 ? void 0 : dialog.close();
      });
  if (showCssHtml) {
    showBtn === null || showBtn === void 0
      ? void 0
      : showBtn.addEventListener("click", function () {
          dialog === null || dialog === void 0 ? void 0 : dialog.showModal();
          clearCssContainer();
          clearDivsHtml();
          initialiseContainer();
          cssContainer.appendChild(divsCss);
          showCssHtml.dataset.current = "css";
          codeDiv === null || codeDiv === void 0
            ? void 0
            : codeDiv.appendChild(cssContainer);
        });
  } else {
    console.error("Element with class 'showCssHtml' not found");
  }
  var appendDiv = function (num, start, end) {
    var newDiv = document.createElement("code");
    newDiv.innerHTML += ".div"
      .concat(num, " { grid-area: ")
      .concat(start[0] + 1, " / ")
      .concat(start[1] + 1, " / ")
      .concat(end[0] + 2, " / ")
      .concat(end[1] + 2, "; }<br />");
    return newDiv;
  };
  var appendDivHtml = function (num) {
    var newDiv = document.createElement("span");
    newDiv.classList.add("sp");
    newDiv.innerHTML += '&lt;div class="div'.concat(
      num,
      '"&gt; &lt;/div&gt;<br />'
    );
    return newDiv;
  };
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      dialog === null || dialog === void 0 ? void 0 : dialog.close();
    }
  });
  var generateColor = function () {
    return "rgba("
      .concat(Math.floor(Math.random() * 256), ",")
      .concat(Math.floor(Math.random() * 256), ",")
      .concat(Math.floor(Math.random() * 256), ", 0.75)");
  };
  var appendGrid = function (end) {
    var color = generateColor();
    if (start && start[0] > end[0]) {
      var tmp = start[0];
      start[0] = end[0];
      end[0] = tmp;
    }
    if (start && start[1] > end[1]) {
      var tmp = start[1];
      start[1] = end[1];
      end[1] = tmp;
    }
    if (start) {
      divsCss.appendChild(appendDiv(divCounts++, start, end));
      for (var i = start[0]; i <= end[0]; i++) {
        for (var j = start[1]; j <= end[1]; j++) {
          var box = document.querySelector(
            '.box[pos="'.concat(i, ",").concat(j, '"]')
          );
          if (box) {
            box.style.backgroundColor = color;
          }
        }
      }
    }
  };
  var addBox = function (rows, columns) {
    var count = 1;
    var _loop_1 = function (i) {
      var _loop_2 = function (j) {
        var box = document.createElement("div");
        box.classList.add("box", "box".concat(count++));
        box.setAttribute("pos", i + "," + j);
        box.addEventListener("mousedown", function () {
          start = [i, j];
        });
        box.addEventListener("mouseup", function () {
          appendGrid([i, j]);
        });
        gridLayout === null || gridLayout === void 0
          ? void 0
          : gridLayout.appendChild(box);
      };
      for (var j = 0; j < columns; j++) {
        _loop_2(j);
      }
    };
    for (var i = 0; i < rows; i++) {
      _loop_1(i);
    }
  };
  var clearCssContainer = function () {
    while (cssContainer.firstChild) {
      cssContainer.removeChild(cssContainer.firstChild);
    }
    cssContainer.innerHTML = "";
  };
  var clearDivsHtml = function () {
    while (divsHtml.firstChild) {
      divsHtml.removeChild(divsHtml.firstChild);
    }
    divsHtml.innerHTML = "";
  };
  var clearGrid = function () {
    while (
      gridLayout === null || gridLayout === void 0
        ? void 0
        : gridLayout.firstChild
    ) {
      gridLayout.removeChild(gridLayout.firstChild);
    }
    clearCssContainer();
    clearDivsHtml();
    while (divsCss.firstChild) {
      divsCss.removeChild(divsCss.firstChild);
    }
    divsCss.innerHTML = "";
    divCounts = 1;
  };
  var createSpan = function (text) {
    var sp = document.createElement("span");
    sp.classList.add("sp");
    sp.textContent = text;
    sp.innerHTML += "<br />";
    return sp;
  };
  var initialiseContainer = function () {
    cssContainer.innerHTML += ".parent {<br />";
    cssContainer.appendChild(createSpan("display: grid;"));
    cssContainer.appendChild(
      createSpan(
        "grid-template-columns: ".concat(
          gridLayout === null || gridLayout === void 0
            ? void 0
            : gridLayout.style.gridTemplateColumns,
          ";"
        )
      )
    );
    cssContainer.appendChild(
      createSpan(
        "grid-template-rows: ".concat(
          gridLayout === null || gridLayout === void 0
            ? void 0
            : gridLayout.style.gridTemplateRows,
          ";"
        )
      )
    );
    cssContainer.appendChild(
      createSpan(
        "grid-column-gap: ".concat(
          gridLayout === null || gridLayout === void 0
            ? void 0
            : gridLayout.style.columnGap,
          ";"
        )
      )
    );
    cssContainer.appendChild(
      createSpan(
        "grid-row-gap: ".concat(
          gridLayout === null || gridLayout === void 0
            ? void 0
            : gridLayout.style.rowGap,
          ";"
        )
      )
    );
    cssContainer.innerHTML += "}<br /><br />";
  };
  var initialiseMainGrid = function () {
    var _a, _b;
    var formSettingData = new FormData(formSetting);
    var objSetting = {
      columns: parseInt(
        (_a = formSettingData.get("columns")) === null || _a === void 0
          ? void 0
          : _a.toString()
      ),
      rows: parseInt(
        (_b = formSettingData.get("rows")) === null || _b === void 0
          ? void 0
          : _b.toString()
      ),
      columnGap: formSettingData.get("columnGap"),
      rowGap: formSettingData.get("rowGap"),
    };
    if (gridLayout) {
      gridLayout.style.gridTemplateColumns = "repeat(".concat(
        objSetting["columns"],
        ", 1fr)"
      );
      gridLayout.style.gridTemplateRows = "repeat(".concat(
        objSetting["rows"],
        ", 1fr)"
      );
      gridLayout.style.columnGap = "".concat(objSetting["columnGap"], "px");
      gridLayout.style.rowGap = "".concat(objSetting["rowGap"], "px");
    }
    initialiseContainer();
    cssContainer.appendChild(divsCss);
    addBox(objSetting["rows"], objSetting["columns"]);
  };
  if (formSetting) {
    formSetting.addEventListener("submit", function (e) {
      e.preventDefault();
      clearGrid();
      initialiseMainGrid();
    });
  }
  initialiseMainGrid();
});
