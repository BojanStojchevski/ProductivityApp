var i = 0;
let tasks = [];
let selectedTaskId = "";
let mode = "work";

const settingsButtons = {
    DELETE: "Delete",
    COMPLETE: "Complete"
};


validateNewTaskForm = function (taskPrioField) {
    let x = taskPrioField.value;

    // If x is Not a Number or less than one or greater than 5
    let message = null;

    if (isNaN(x) || x < 1 || x > 5) {
        message = "Priority number must be between 1 and 5";
    }
    let errorSpan = document.getElementById("errorMessage");
    let saveBtn = document.getElementById("save");

    if (message) {
        errorSpan.innerHTML = message;
        errorSpan.style.display = "inline-block";
        saveBtn.disabled = true;
    }
    else {
        errorSpan.style.display = "none";
        saveBtn.disabled = false;
    }
}

validateNewTaskForm2 = function (taskWorkTime) {
    let x = taskWorkTime.value;

    // If x is Not a Number or less than one or greater than 60
    let message = null;

    if (isNaN(x) || x < 1 || x > 60) {
        message = "Work time must be between 1 and 60 min";
    }
    let errorSpan = document.getElementById("errorMessage2");
    let saveBtn = document.getElementById("save");

    if (message) {
        errorSpan.innerHTML = message;
        errorSpan.style.display = "inline-block";
        errorSpan.style.color = "red"
        saveBtn.disabled = true;
    }
    else {
        errorSpan.style.display = "none";
        saveBtn.disabled = false;
    }
}

openModal = function () {
    document.getElementById("modal").style.display = "block";
    //Add to show Sessions
    // console.log(tasks[0].taskDesc)
}

//Nikola logic for sessions
//Username 
//Task name
//Task description

var sessions = [];
var selectedId = null;
let currentSessionArr = [];
let allUserTasks = [];

document.addEventListener('DOMContentLoaded', function () {
    var currentSessionsBtn = document.getElementById('currentSessionBtn');

    currentSessionsBtn.addEventListener('click', function () {
        var currentSessionElements = document.querySelectorAll('.session');
        currentSessionElements.forEach(function (currentSessionElement) {
            currentSessionElement.remove();
        });
        currentSessionArr.forEach(task => {
            // var sessionContainer = document.createElement("div");
            // sessionContainer.classList.add("sessionContainerClass");
            var sessionElement = document.createElement('div');
            sessionElement.classList.add('session');
            sessionElement.classList.add('my-sessions-container');

            var nameElement = document.createElement('h3');
            nameElement.textContent = "User: " + task.taskCurrentUser;
            nameElement.classList.add('session-text');
            sessionElement.appendChild(nameElement);

            var dateElement = document.createElement('p');
            dateElement.textContent = 'Task Description: ' + task.taskDesc;
            dateElement.classList.add('session-text');
            sessionElement.appendChild(dateElement);

            var durationElement = document.createElement('p');
            durationElement.textContent = 'Duration: ' + (task.worktime / 60 + " Min");
            durationElement.classList.add('session-text');
            sessionElement.appendChild(durationElement);
            // sessionContainer.appendChild(sessionElement);
            document.body.appendChild(sessionElement)
            // document.body.appendChild(sessionContainer); 

        })
        hideButtonById('displayReminders')
        hideButtonById('reminderList')
        hideCalendar();
        hideButtonById('timer2');
        showButtonByIdFlex('centeredContainer');
    })
    let taskPrioiField = document.getElementById("taskPrio");
    taskPrioiField.addEventListener("keyup", function () {
        validateNewTaskForm(taskPrioiField);
    })
    let taskWorkTimeField = document.getElementById("inputTime");
    taskWorkTimeField.addEventListener("keyup", function () {
        validateNewTaskForm2(taskWorkTimeField);
    })
});

document.addEventListener('DOMContentLoaded', function () {
    var nextSessionBtn = document.getElementById('nextSessionBtn');
    var previousSessionElement = null;

    nextSessionBtn.addEventListener('click', function () {
        var currentTask = currentSessionArr[0];
        var nextLargestTask = null;
        var currenttaskPrio = parseInt(currentTask.taskPrio);

        for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            var taskPrio = parseInt(task.taskPrio);

            if (taskPrio > currenttaskPrio) {
                if (!nextLargestTask || taskPrio < parseInt(nextLargestTask.taskPrio)) {
                    nextLargestTask = task;
                }
            }
        }

        if (previousSessionElement) {
            previousSessionElement.remove();
        }
        // var sessionContainer = document.createElement("div");
        // sessionContainer.classList.add("sessionContainerClass");
        if (nextLargestTask) {
            var sessionElement = document.createElement('div');

            sessionElement.id = 'session-' + nextLargestTask.taskId;
            sessionElement.classList.add('session');
            sessionElement.classList.add('my-sessions-container');

            var nameElement = document.createElement('h3');
            nameElement.textContent = "User: " + nextLargestTask.taskCurrentUser;
            nameElement.classList.add('session-text');
            sessionElement.appendChild(nameElement);

            var dateElement = document.createElement('p');
            dateElement.textContent = 'Task Description: ' + nextLargestTask.taskDesc;
            dateElement.classList.add('session-text');
            sessionElement.appendChild(dateElement);

            var durationElement = document.createElement('p');
            durationElement.textContent = 'Duration: ' + (nextLargestTask.worktime / 60 + " Min");
            durationElement.classList.add('session-text');
            sessionElement.appendChild(durationElement);
            document.body.appendChild(sessionElement);
            previousSessionElement = sessionElement; // Store the current session element
        }
        // document.body.appendChild(sessionContainer); 

        hideButtonById('displayReminders')
        hideButtonById('reminderList')
        hideButtonById('timer2');
        hideCalendar();
        showButtonByIdFlex('centeredContainer')
    });
});



document.addEventListener('DOMContentLoaded', function () {
    var allSessionsBtn = document.getElementById('allSessionsBtn');

    allSessionsBtn.addEventListener('click', function () {
        var sessionElements = document.querySelectorAll('.session');
        hideButtonById('displayReminders')
        hideButtonById('reminderList')
        hideCalendar();
        hideButtonById("timer2");
        showButtonByIdFlex('centeredContainer')
        sessionElements.forEach(function (sessionElement) {
            sessionElement.remove();
        });

        for (let i = 0; i <= tasks.length - 1; i++) {
            sessions.push({ name: currentUser, taskDescription: tasks[i].taskDesc, duration: tasks[i].worktime / 60 + " Min" });
        }

        sessions.forEach(function (session) {
            var sessionElement = document.createElement('div');
            sessionElement.classList.add('session');
            sessionElement.classList.add('my-sessions-container');

            var nameElement = document.createElement('h3');
            nameElement.textContent = "User: " + session.name;
            nameElement.classList.add('session-text');
            sessionElement.appendChild(nameElement);

            var dateElement = document.createElement('p');
            dateElement.textContent = 'Task Description: ' + session.taskDescription;
            dateElement.classList.add('session-text');
            sessionElement.appendChild(dateElement);

            var durationElement = document.createElement('p');
            durationElement.textContent = 'Duration: ' + session.duration;
            durationElement.classList.add('session-text');
            sessionElement.appendChild(durationElement);

            document.body.appendChild(sessionElement);
        });
        sessions = [];
    });
});


closeModal = function () {
    document.getElementById("taskName").value = "";
    document.getElementById("taskDesc").value = "";
    document.getElementById("taskPrio").value = "";
    document.getElementById("inputTime").value = "";
    document.getElementById("modal").style.display = "none";
}

generateUID = function () {
    // I generate the UID from two parts here 
    // to ensure the random number provide enough bits.
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

addTask = function () {
    const taskName = document.getElementById("taskName").value;
    const taskPrio = document.getElementById("taskPrio").value;
    const taskDesc = document.getElementById("taskDesc").value;
    let taskWorkTime = document.getElementById("inputTime").value;

    let parsedWorkTime = parseInt(taskWorkTime) || 45;
    if (taskName.length < 1 || taskPrio.length < 1 || taskWorkTime.length < 1) {
        alert("Enter values");
        return;
    }
    let taskCurrentName = currentUser;
    const newTask = {
        taskId: generateUID(),
        taskName: taskName,
        taskPrio: taskPrio,
        taskDesc: taskDesc,
        taskCurrentUser: taskCurrentName,
        worktime: parsedWorkTime * 60,
        longbreak: Math.floor(parsedWorkTime / 3 * 60),
        shortbreak: Math.floor(parsedWorkTime / 9 * 60)
    }
    i++;
    tasks.push(newTask);
    renderTasks();
}


const renderTasks = () => {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const taskName = task.taskName;
        const taskPrio = task.taskPrio;
        const taskDesc = task.taskDesc;
        const spanName = createElement("span");
        spanName.id = "taskName";
        spanName.textContent = taskName;
        let spanEst = createElement("span", taskPrio);
        spanEst.id = "taskPrio";
        spanEst.textContent = taskPrio;
        let spanDesc = createElement("div");
        spanDesc.id = "taskDesc";
        spanDesc.textContent = taskDesc;
        let div = createElement("div");
        div.id = task.taskId;

        div.appendChild(spanName);
        div.appendChild(spanEst);
        div.appendChild(createElement("br"));
        div.appendChild(spanDesc);

        if (taskDesc.length > 30) {
            div.classList = "hover-text";
            let fullTooltipText = createElement("span");
            fullTooltipText.textContent = taskDesc;
            fullTooltipText.classList = "tooltip-text";
            fullTooltipText.id = "bottom";
            spanDesc.innerHTML = spanDesc.innerHTML.substr(0, 30) + "...";
            div.appendChild(fullTooltipText);
        }
        let hr = document.createElement("hr");
        hr.style.width = "300px";
        hr.style.color = "white";

        div.appendChild(hr);
        makeElementClickable(div);

        let li = createElement("li");

        li.id = i + 1;
        li.appendChild(div);
        appendSettingsButton(li);
        div.addEventListener("click", () => {
            timer.stop();
            updateTaskTime();
            updateTasks();
            selectedTaskId = task.taskId;
            search();
            workStarted = true;
            document.querySelector('#start').innerHTML = `Start`;
            timer.time = task1.workTime;
            elements.min.innerText = `${Math.floor(timer.time / 60).toString().padStart(2, 0)}`;
            elements.sec.innerHTML = `${(timer.time % 60).toString().padStart(2, 0)}`;
            document.querySelector("#shortBreakSession").disabled = false;
            document.querySelector("#longBreakSession").disabled = false;
            document.querySelector("#workSession").disabled = false;
            document.querySelector("#start").disabled = false;
        })

        taskList.appendChild(li);
        displayList(true);
        closeModal();
        if (tasks.length == 5) {
            toggleAddButton(true);
        }
        div.addEventListener("click", () => {
            selectedId = div.id;
            currentSessionArr = [];
            for (i = 0; i < tasks.length; i++) {
                if (tasks[i].taskId == div.id) {
                    currentSessionArr.push(tasks[i]);
                }
            }
            // currentSessionArr.push(newTask);
        })
    })

    console.log(selectedTaskId)
}

makeElementClickable = function (div) {
    div.addEventListener("click", function () {
        deselectElements(div);

        if (div.isClicked) {
            removeSelectedElement(div);
        } else {
            selectedTaskId = div.id;
            div.classList.add("isSelected");
            div.isClicked = true;
        }
    })
}

removeSelectedElement = function (element) {
    element.classList.remove("isSelected");
    element.isClicked = false;
    selectedTaskId = "";
}

deselectElements = function (div) {
    let selectedElement = document.getElementsByClassName("isSelected")[0];
    if (selectedElement && div != selectedElement) {
        removeSelectedElement(selectedElement);
    }
}

createElement = function (element, input) {
    if (!input) {
        return document.createElement(element);
    }

    let newElement = document.createElement(element);
    newElement.innerHTML = input.value;
    newElement.id = input.name;
    return newElement;
}

appendSettingsButton = function (li) {
    let buttonDiv = document.createElement("div");
    buttonDiv.classList = "actionButtons";

    const button1 = addButton(li, settingsButtons.DELETE);
    const button2 = addButton(li, settingsButtons.COMPLETE);

    buttonDiv.appendChild(button1);
    buttonDiv.appendChild(button2);

    li.appendChild(buttonDiv);
}

addButton = function (li, buttonType) {
    let button = document.createElement("button");

    button.innerHTML = buttonType;

    const buttonClass = buttonType.toLowerCase() === "delete" ?
        "btn btn-outline-danger" : "btn btn-outline-primary";

    button.classList = buttonClass;

    switch (buttonType) {
        case settingsButtons.DELETE:

            button.onclick = function () {
                let ul = li.parentNode;
                ul.removeChild(li);
                i--;
                const currentTaskId = li.querySelector("div").id;
                removeElementAtIndex(currentTaskId);
                timer.stop();
                elements.min.innerHTML = "--";
        elements.sec.innerHTML = "--";
        blockButtons();
                if (ul.childElementCount == 0) {
                    displayList(false);
                }
                toggleAddButton(false);
            }
            break;

        case settingsButtons.COMPLETE:
            button.onclick = function () {
                let checkImg = createElement("img");
                checkImg.src = "./images/complete-icon.jpg";
                checkImg.style.height = "30px";
                checkImg.style.width = "30px";
                checkImg.style.marginBottom = "50px";
                li.prepend(checkImg);
                li.querySelector("#taskName").style.textDecoration = "line-through";
                button.style.display = "none";
                timer.stop();
                blockButtons();
            }
            break;
    }
    return button;
}

removeElementAtIndex = function (taskId) {
    let taskList = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].taskId != taskId) {
            taskList.push(tasks[i]);
        }
    }
    tasks = taskList;
}

displayList = function (toggle) {
    if (toggle) {
        document.getElementById("tasks").style.display = "block";
    } else {
        document.getElementById("tasks").style.display = "none";
    }
}

toggleAddButton = function (toggle) {
    document.getElementById("taskBtn").disabled = toggle;
}

let mpl = document.querySelector("#music_player_container");
mpl.style.display = "none";
var currentUser = null;
//Nikola logic for login to store pass/user
document.addEventListener('DOMContentLoaded', function () {

    var innerLoginButton = document.getElementById('innerLoginButton');
    innerLoginButton.addEventListener('click', function () {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        if (!matchCredentials(username, password)) {
            showWrongLoginMessage();
            hideBootstrapModal('loginModal');
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            return;
        }



        document.getElementById('username').value = '';
        document.getElementById('password').value = '';

        hideBootstrapModal('loginModal');
        hideButtonById('loginButton');
        hideButtonById('registerButton');
        showButtonById('signOutButton');
        showButtonById('navBarButton');
        showButtonById('timerDisplay');
        showButtonById('taskBar');
        showButtonByIdFlex('centeredContainer')
        hideButtonById('carouselExampleAutoplaying'); //SLIDESHOW
        currentUser = username;
        mpl.style.display = "inline-block";
        renderTasks();
        document.getElementById("navBarId").style.justifyContent = "space-between";
        blockButtons();


        let x = 0;
        console.log("before while");
        while (x < allUserTasks.length) {
            console.log("in-while;")
            if (allUserTasks[x].taskCurrentUser == currentUser) {
                tasks.push(allUserTasks[x]);
                allUserTasks.splice(x, 1);
                x = 0;
            } else {
                x++;
            }
        }
        renderTasks();
        index_no = 0;
        load_track(index_no);
        mainButtons.style.display = "none";
        bottomContainer.style.display = "none";
        noteIconContainer.style.borderRadius = "40px";
        noteIconContainer.style.borderRight = "none";
        mp.style.width = "113.25px";
        mp.style.left = "20px";
        mp.style.top = "170px";
        mp.style.padding = "0px";
        expandBtn.innerHTML = '<i class="fa fa-caret-down" aria-hidden="true" id="expand_btn_content" ></i>';
    });
});

//sign out button logic
document.addEventListener('DOMContentLoaded', function () {
    var signOutButton = document.getElementById('signOutButton');
    signOutButton.addEventListener('click', function () {
        displayList(false);
        showButtonById('loginButton');
        showButtonById('registerButton');
        hideButtonById('signOutButton');
        hideButtonById('navBarButton');
        hideButtonById('timerDisplay');
        hideButtonById('taskBar');
        hideButtonById('displayReminders'); //reminders hide
        hideButtonById('reminderList');
        hideButtonById('timer2');
        hideCalendar();
        timer.stop();
        updateTaskTime();
        updateTasks();
        elements.min.innerHTML = "--";
        elements.sec.innerHTML = "--";
        selectedTaskId = "";
        showButtonById('carouselExampleAutoplaying');
        signOutMessage();
        mpl.style.display = "none";

        document.getElementById("navBarId").style.justifyContent = "end"
        tasks.forEach(task => {
            allUserTasks.push(task);
        })
        tasks = [];
        var currentSessionElements = document.querySelectorAll('.session');
        currentSessionElements.forEach(function (currentSessionElement) {
            currentSessionElement.remove();
        });
        var sessionElements = document.querySelectorAll('.session');

        sessionElements.forEach(function (sessionElement) {
            sessionElement.remove();
        });
        toggleAddButton(false);
        pausesong();
        track.currentTime = 0;
    })
})

function hideCalendar() {
    document.getElementById("card").style.display = "none";
}


function hideBootstrapModal(modalId) {
    var modalElement = document.getElementById(modalId);
    var modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
}

function hideButtonById(button) {
    var hideButton = document.getElementById(button);
    hideButton.style.display = 'none';
}
function showButtonById(button) {
    var showButton = document.getElementById(button);
    showButton.style.display = 'block';
}
function showButtonByIdFlex(button) {
    var showButtonFlex = document.getElementById(button);
    showButtonFlex.style.display = 'flex';
}

//test credentials
var testCredentials = [
    { username: 'Nikola', password: 'password123', firstName: 'Nikola', lastName: 'Jovanovski' },
    { username: 'Aleksandar', password: 'password456', firstName: 'Aleksandar', lastName: 'Aleksandrovski' },
    { username: 'Kire', password: 'password789', firstName: 'Kire', lastName: 'Kirovski' },
    { username: 'Albert', password: 'password012', firstName: 'Albert', lastName: 'Albertovski' },
    { username: "e", password: "e", firstName: 's', lastName: '3' }
]

function matchCredentials(username, password) {
    var matchedUser = null;
    var j = 0;

    for (j = 0; j < testCredentials.length; j++) {
        if (testCredentials[j].username === username && testCredentials[j].password === password) {
            matchedUser = testCredentials[j];
            break;
        }
    }
    if (matchedUser) {
        console.log('Matched credentials:', "Full Name: " + matchedUser.firstName, matchedUser.lastName, "Username: " + matchedUser.username, "Password: " + matchedUser.password);
        return true;
    }
    else {
        console.log('Error: Incorrect username or password');
        return false;
    }
}
//Nikola logic for register
document.addEventListener('DOMContentLoaded', function () {
    var innerRegisterButton = document.getElementById('innerRegisterButton');
    innerRegisterButton.addEventListener('click', function () {

        var firstName = document.getElementById('firstname').value;
        var lastName = document.getElementById('lastname').value;
        var username = document.getElementById('registerUsername').value;
        var password = document.getElementById('registerPassword').value;
        var confirmPassword = document.getElementById('confirmpassword').value;

        if (!isFirstNameFilled(firstName)) {
            return;
        }
        if (!isLastNameFilled(lastName)) {
            return;
        }
        if (!isUserAvailable(username)) {
            return;
        }
        if (!isPasswordLongEnough(password)) {
            return;
        }
        if (!isPasswordMatching(password, confirmPassword)) {
            return;
        }
        addUserToCredentials(firstName, lastName, username, password);
    })
})

function isFirstNameFilled(firstName) {
    firstName = firstName.trim();

    if (typeof firstName !== 'string') {
        alert("Please enter a valid first name!");
        document.getElementById('firstname').value = '';
        return false;
    }

    if (firstName === '' || firstName.length < 2) {
        alert("First name must be at least 2 characters long!");
        document.getElementById('firstname').value = '';
        return false;
    }

    if (!/^[a-zA-Z '-]+$/.test(firstName)) {
        alert("First name must contain only letters, spaces, hyphens, and apostrophes!");
        document.getElementById('firstname').value = '';
        return false;
    }
    return true;
}
function isLastNameFilled(lastName) {
    lastName = lastName.trim();

    if (typeof lastName !== 'string') {
        alert("Please enter a valid Last name!");
        document.getElementById('lastname').value = '';
        return false;
    }

    if (lastName === '' || lastName.length < 2) {
        alert("Last name must be at least 2 characters long!");
        document.getElementById('lastname').value = '';
        return false;
    }

    if (!/^[a-zA-Z '-]+$/.test(lastName)) {
        alert("Last name must contain only letters, spaces, hyphens, and apostrophes!");
        document.getElementById('lastname').value = '';
        return false;
    }
    return true;
}

function isUserAvailable(username) {
    for (var i = 0; i < testCredentials.length; i++) {
        if (testCredentials[i].username === username) {
            alert("That username is already in use!");
            document.getElementById('registerUsername').value = '';
            return false;
        }
    }
    return true;
}

function isPasswordLongEnough(password) {
    if (password.length < 5) {
        alert("Your password is not long enough!");
        return false;
    }
    return true;
}
function isPasswordMatching(password, confirmPassword) {
    console.log(password + "hi from isPasswordMatching")
    console.log(confirmPassword)

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        document.getElementById('registerPassword').value = '';
        document.getElementById('confirmpassword').value = '';
        return false;
    }
    return true;
}

function addUserToCredentials(firstName, lastName, username, password) {
    var newUser = {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
    };

    testCredentials.push(newUser);

    showSignupSuccessMessage();
    document.getElementById('firstname').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('confirmpassword').value = '';
    hideBootstrapModal('registerModal');
}
//wrong login message

function showWrongLoginMessage() {
    var wrongLoginToast = new bootstrap.Toast(document.getElementById('wrongLoginToast'));
    wrongLoginToast.show();

    setTimeout(function () {
        wrongLoginToast.hide();
    }, 5000);
}

//sucessful signout message

function signOutMessage() {
    var signOutMessage = new bootstrap.Toast(document.getElementById('signOutToast'));
    signOutMessage.show();

    setTimeout(function () {
        signOutMessage.hide();
    }, 5000);
}

//user already exits message

function showSignupSuccessMessage() {
    var signupToast = new bootstrap.Toast(document.getElementById('signupToast'));
    signupToast.show();

    setTimeout(function () {
        signupToast.hide();
    }, 5000);
}






//fix this part

let task1 = {
    name: "task1",
    workTime: 0,
    longTime: 0,
    shortTime: 0,
    id: ""
};
let workStarted = false;
let longStarted = false;
let shortStarted = false;

let elements = {
    min: document.querySelector("#minutes"),
    sec: document.querySelector("#seconds"),
    work: document.querySelector("#workSession").
        addEventListener("click", () => {
            document.querySelector('#start').disabled = false;
            timer.stop();
            updateTaskTime();
            workStarted = true;
            document.querySelector('#start').innerHTML = `Start`;
            timer.time = task1.workTime;
            elements.min.innerText = `${Math.floor(timer.time / 60).toString().padStart(2, 0)}`;
            elements.sec.innerHTML = `${(timer.time % 60).toString().padStart(2, 0)}`;
        }
        ),
    long: document.querySelector("#longBreakSession").
        addEventListener("click", () => {
            document.querySelector('#start').disabled = false;
            timer.stop();
            updateTaskTime();
            longStarted = true;
            document.querySelector('#start').innerHTML = `Start`;
            timer.time = task1.longTime;
            elements.min.innerHTML = `${Math.floor(timer.time / 60).toString().padStart(2, 0)}`;
            elements.sec.innerHTML = `${(timer.time % 60).toString().padStart(2, 0)}`;
        }),
    short: document.querySelector("#shortBreakSession").
        addEventListener("click", () => {
            document.querySelector('#start').disabled = false;
            timer.stop();
            updateTaskTime();
            shortStarted = true;
            document.querySelector('#start').innerHTML = `Start`;
            timer.time = task1.shortTime;
            elements.min.innerHTML = `${Math.floor(timer.time / 60).toString().padStart(2, 0)}`;
            elements.sec.innerHTML = `${(timer.time % 60).toString().padStart(2, 0)}`;
        }),
    start:
        document.querySelector("#start").
            addEventListener("click", () => {
                if (timer.interval === null) {
                    document.querySelector('#start').disabled = false;
                    timer.start();
                    document.querySelector('#start').innerHTML = `Pause`
                }
                else {
                    document.querySelector('#start').disabled = false;
                    timer.stop();
                    document.querySelector('#start').innerHTML = `Start`
                }
            })
}


let timer = {
    time: task1.workTime,
    interval: null,
    start: function () {
        this.interval = setInterval(() => {
            if (this.time !== 0) {
                this.time--;
            }
            convertFromSeconds();

        }, 1000)
    },
    stop: function () {
        clearInterval(this.interval);
        this.interval = null;
    }
}

function convertFromSeconds() {
    const minutes = Math.floor(timer.time / 60);
    const seconds = timer.time % 60;
    elements.min.textContent = minutes.toString().padStart(2, 0);
    minutess2.textContent = minutes.toString().padStart(2, 0);
    elements.sec.textContent = seconds.toString().padStart(2, 0);
    seconds2.textContent = seconds.toString().padStart(2, 0);
}
function updateTaskTime() {
    if (workStarted == true) {
        task1.workTime = timer.time;
        workStarted = false;
    }
    else if (longStarted == true) {
        task1.longTime = timer.time;
        longStarted = false;
    }
    else if (shortStarted == true) {
        task1.shortTime = timer.time;
        shortStarted = false;
    }
    else {
        console.log("Press start!")
    }
}


function search() {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].taskId === selectedTaskId) {
            task1.workTime = tasks[i].worktime;
            task1.longTime = tasks[i].longbreak;
            task1.shortTime = tasks[i].shortbreak;
            task1.name = tasks[i].taskName
            task1.id = tasks[i].taskId
        }
    }
};

function updateTasks() {
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].taskId === task1.id) {
            tasks[i].worktime = task1.workTime;
            tasks[i].longbreak = task1.longTime;
            tasks[i].shortbreak = task1.shortTime;
        }
    }
}


let minutess2 = document.querySelector("#minutes2");
minutess2.innerHTML = `${(timer.time % 60).toString().padStart(2, 0)}`;
let seconds2 = document.querySelector("#seconds2");
seconds2.innerHTML = `${(timer.time % 60).toString().padStart(2, 0)}`;

//     let dns= document.createElement("span");
//     dns.innerHTML=`${document.querySelector('#minutes').innerText}`;
//     document.body.append(dns);
// console.log(elements.sec)
// REMINDERS
let reminders = [];

function removeReminder(id) {
    reminders = reminders.filter(el => el.id !== id)
    renderReminders(reminders)
}


//REMINDER ITEM
function createReminderItem(reminder) {
    let reminderItem = document.createElement('div');
    reminderItem.className = 'reminderDivElement';
    reminderItem.attributes.id = reminder.id;


    let buttonDivForReminders = document.createElement('div');
    buttonDivForReminders.className = 'buttonDiv';

    //text in the reminder
    let headerText = document.createElement('h3');
    headerText.className = 'headerText';
    headerText.textContent = reminder.value;

    //delete button
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    deleteButton.addEventListener('click', function () {
        removeReminder(reminder.id)
    });

    //edit button
    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'editButton';
    editButton.addEventListener('click', function () {
        createEditButtonForModal(reminderItem, reminder)

    });

    // Append delete and edit buttons to the reminder item
    reminderItem.appendChild(headerText);
    buttonDivForReminders.appendChild(editButton);
    buttonDivForReminders.appendChild(deleteButton);
    reminderItem.appendChild(buttonDivForReminders)

    return reminderItem;
}

//button edit on reminders to display modal and functionality
function createEditButtonForModal(reminderItem, editReminder) {
    //Modal for edit button on reminders
    let modalEdit = document.getElementById('editModal');
    showButtonById('editModal');


    let reminderToUpdate = reminders.find(el => el.id === editReminder.id)
    let updatedTextInput = document.getElementById('updatedText');
    updatedTextInput.value = reminderToUpdate.value;

    let saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', function () {
        let updatedTextValue = updatedTextInput.value;

        // Update the reminder text if user provides valid input
        if (reminderToUpdate !== null && updatedTextValue !== null && updatedTextValue !== '') {
            reminderToUpdate.value = updatedTextValue;
            let headerText = reminderItem.querySelector('.headerText');
            headerText.textContent = reminderToUpdate.value;
        }


        hideButtonById('editModal');
        reminderToUpdate = null;
    });

    let cancelButton = document.getElementById("cancelButton");
    cancelButton.addEventListener('click', function () {
        hideButtonById('editModal');
        reminderToUpdate = null;
    })
}

//all reminders to show
function renderReminders() {
    document.getElementById('reminderList').innerHTML = ""
    reminders.forEach(el => {
        var reminderItem = createReminderItem(el);
        let reminderList = document.getElementById('reminderList');
        reminderList.appendChild(reminderItem);
    })
}

let messageReminder = document.getElementById('messageReminder');
// Event listener for form submission
document.getElementById('reminderForm').addEventListener('submit', function (event) {
    event.preventDefault();

    //reminder input value
    let reminderInput = document.getElementById('reminderInput');
    let reminderText = reminderInput.value;

    if (reminderText !== '') {
        reminders.push({ id: Math.random().toString(), value: reminderText })
        // Clear the input
        reminderInput.value = '';
    }
    messageReminder.innerHTML = 'Succesfully added reminder'
    setTimeout(function () {
        messageReminder.innerHTML = '';
    }, 3000);

});
//Set/Edit reminder button 
let addMenuReminder = document.getElementById('addMenuReminder');
//Timer and taskBar div 
let timerAndTaskBarDiv = document.getElementsByClassName('centered-container')[0];
//View reminders button
let displayMainDiv = document.getElementById('displayReminders');
// Add the reminder item to the list
let allReminders = document.getElementById("allReminders");
allReminders.addEventListener("click", () => {
    renderReminders()
    hideButtonById('displayReminders')
    hideCalendar();
    var currentSessionElements = document.querySelectorAll('.session');
    currentSessionElements.forEach(function (currentSessionElement) {
        currentSessionElement.remove();
    });
    reminderList.style.display = 'flex';
    timerAndTaskBarDiv.style.display = 'none';
    if (document.getElementById("start").textContent != "Start") {
        timer2.hidden = false;
        showButtonById('timer2');
    }
})
let reminderList = document.getElementById('reminderList');
//Add Menu reminder to show main div when the button from mennu is clicked
addMenuReminder.addEventListener('click', function () {
    showButtonById('displayReminders');
    hideButtonById('reminderList');
    hideCalendar();
    var currentSessionElements = document.querySelectorAll('.session');
    currentSessionElements.forEach(function (currentSessionElement) {
        currentSessionElement.remove();
    });
    timerAndTaskBarDiv.style.display = 'none';
    if (document.getElementById("start").textContent != "Start") {
        timer2.hidden = false;
        showButtonById('timer2');
    }
});
let timer2 = document.getElementById("timer2");
timer2.addEventListener('click', function () {
    timerAndTaskBarDiv.style.display = 'flex';
    hideButtonById('displayReminders');
    hideButtonById('reminderList');
    hideCalendar();
    hideButtonById('timer2');
})
//Productivio from the menu to show task bar and the timer -Aleksandar
let productivioMenuButton = document.getElementById('titleNavBar');
productivioMenuButton.addEventListener('click', function () {
    timerAndTaskBarDiv.style.display = 'flex';
    hideCalendar();
    hideButtonById('displayReminders');
    hideButtonById('reminderList');
    hideButtonById('timer2');
    var currentSessionElements = document.querySelectorAll('.session');
    currentSessionElements.forEach(function (currentSessionElement) {
        currentSessionElement.remove();
    });
});

//Start of Music Player
//MP DOM
let expandBtn = document.querySelector("#expand_btn");
let bottomContainer = document.querySelector("#bottom_part_container");
let noteIconContainer = document.querySelector("#main_icon_container");
let sliders = document.querySelector("#scale");
let noteBtn = document.querySelector("#note_btn");
let mainButtons = document.querySelector("#main_controls_container");
let mp = document.querySelector("#music_player_container");
let loopBtn = document.querySelector("#loop_btn");
let songsContainer = document.querySelector("#songs_container");
let pSongNameClass = document.querySelector("#p_song_name_class");
let prevBtn = document.querySelector("#prev_btn");
let playBtn = document.querySelector("#play_btn");
let nextBtn = document.querySelector("#next_btn");
let volumeRange = document.querySelector("#volume_range");
let volumeRangeContainer = document.querySelector("#volume_range_container");
let songRange = document.querySelector("#song_time_range");
let volumeIconContainer = document.querySelector("#volume_icon_container");
let songImg = document.querySelector("#song_img");
let currentSongName = document.querySelector("#p_song_name_id");
let autoBtn = document.querySelector("#autoplay_btn");
// let main
let navbar = document.querySelector("#navBarMain");
let songTimerContainer = document.querySelector("#song_time_container");
//MP Click Events

noteBtn.addEventListener("click", function () {
    if (mainButtons.style.display == "flex") {
        mp.style.position = "absolute";
        mainButtons.style.opacity = "0";
        mainButtons.style.display = "none";
        bottomContainer.style.display = "none";
        noteIconContainer.style.opacity = "0";
        setTimeout(() => {
            noteIconContainer.style.transition = "opacity .2s";
            noteIconContainer.style.opacity = "1";
            setTimeout(() => {
                noteIconContainer.style.transition = "none";
            }, 210);
        }, 200);
        noteIconContainer.style.borderRadius = "40px";
        noteIconContainer.style.borderRight = "none";
        expandBtn.innerHTML = '<i class="fa fa-caret-down" aria-hidden="true" id="expand_btn_content" ></i>'
        mp.style.width = "113.25px"
        mp.style.left = "20px";
        mp.style.top = "170px";
        mp.style.padding = "0px";



    } else {
        volumeRangeContainer.style.paddingLeft = "0px"
        mainButtons.style.display = "flex";
        mainButtons.style.opacity = "0";
        noteIconContainer.style.opacity = "0";
        setTimeout(() => {
            noteIconContainer.style.transition = "opacity .2s";
            mainButtons.style.opacity = "1";
            noteIconContainer.style.opacity = "1";
            setTimeout(() => {
                noteIconContainer.style.transition = "none";
            }, 210);
        }, 200);
        noteIconContainer.style.borderRadius = "11px 0px 0px 11px";
        noteIconContainer.style.borderRight = "1px solid black";
        mp.style.width = "420px"
        songImg.style.height = "71.31px";
        if (window.matchMedia("(max-width: 1500px)").matches) {
            volumeRangeContainer.style.paddingLeft = "0px";
            volumeRange.style.width = "100px";
            mp.style.position = "fixed";
            mp.style.top = "auto";
            mp.style.bottom = "0px";
            mp.style.left = "0px";
            mp.style.width = "100%";
            mp.style.padding = "0px 400px 0px 400px";
            songTimerContainer.style.width = "72%";
            volumeIconContainer.style.width = "5%";
            volumeRangeContainer.style.width = "25%";
            volumeRange.style.width = "80%";
            songImg.style.height = "71.31px";
            if (mainButtons.style.display == "flex" && window.matchMedia("(max-width: 1300px)").matches) {
                mp.style.padding = "0px 300px 0px 300px";
                songImg.style.height = "71.31px";
                if (mainButtons.style.display == "flex" && window.matchMedia("(max-width: 1100px)").matches) {
                    mp.style.padding = "0px 250px 0px 250px";
                    if (mainButtons.style.display == "flex" && window.matchMedia("(max-width: 900px)").matches) {
                        mp.style.padding = "0px 200px 0px 200px";
                        if (mainButtons.style.display == "flex" && window.matchMedia("(max-width: 900px)").matches) {
                            mp.style.padding = "0px";
                            if (mainButtons.style.display == "flex" && window.matchMedia("(max-width: 313px)").matches) {
                                songImg.style.height = "100%";
                            }
                        }
                    }
                }
            }

        }
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            mp.style.position = "fixed";
            mp.style.top = "auto";
            mp.style.left = "0px";
            mp.style.width = "100%"
            mp.style.bottom = "0px";
            songTimerContainer.style.width = "72%";
            volumeIconContainer.style.width = "5%";
            volumeRangeContainer.style.width = "20%";
            volumeRangeContainer.style.paddingLeft = "11px"
            volumeRange.style.width = "100%";
            songImg.style.width = "100%"

        }
    }
});

expandBtn.addEventListener("click", function () {
    if (bottomContainer.style.display == "flex") {
        bottomContainer.style.display = "none";
        noteIconContainer.style.borderRadius = "11px 0px 0px 11px";
        scale.style.borderRadius = "0px 0px 11px 0px";
        expandBtn.innerHTML = '<i class="fa fa-caret-down" aria-hidden="true" id="expand_btn_content" ></i>';
    } else {
        bottomContainer.style.display = "flex";
        noteIconContainer.style.borderRadius = "11px 0px 0px 0px";
        scale.style.borderRadius = "0px 0px 0px 0px";
        expandBtn.innerHTML = '<i class="fa fa-caret-up" aria-hidden="true" id="expand_btn_content2"></i>';
    }
});
//MP
let timerMP;
let autoplay = 0;

let index_no = 0;
let playing_song = false;

//audio element
let track = document.createElement("audio");

//all songs
let all_songs = [
    {
        name: "Hyakke - Kagefumi",
        path: "../src/music/Hyakke - Kagefumi.mp3",
        img: "../src/img/a3145441046_5.jpg"
    },
    {
        name: "Nujabes - Aruarian dance",
        path: "../src/music/Nujabes - Aruarian dance.mp3",
        img: "../src/img/artworks-000010633044-0pecn0-t500x500.jpg"
    },
    {
        name: "Peacock Affect - Who Cares If You Exist (eisu remix)",
        path: "../src/music/Peacock Affect - Who Cares If You Exist (eisu remix).mp3",
        img: "../src/img/artworks-000092286828-3ghmnl-t240x240.jpg"
    },
    {
        name: "KOAN Sound - Lost In Thought",
        path: "../src/music/KOAN Sound - Lost In Thought.mp3",
        img: "../src/img/artworks-dblZ961xJv8n-0-t500x500.jpg"
    }
];
//fncs
// fnc load track
function load_track(index) {
    reset_slider();
    track.src = all_songs[index].path
    songImg.src = all_songs[index].img
    currentSongName.innerHTML = all_songs[index].name
    track.load();
    timerMP = setInterval(range_slider, 1000);
}
load_track(index_no);

//reset song
function reset_slider() {
    songRange.value = 0;
}

//checking if the song is playing
function justplay() {
    if (playing_song == false) {
        playsong();
    } else if (songRange.value == 100) {
        songRange.value = 0;
        playsong();
    } else {
        pausesong();
    }
};

//play song
function playsong() {
    track.play();
    playing_song = true;
    playBtn.innerHTML = '<i class = "fa fa-pause"></i>';
};

//pause song
function pausesong() {
    track.pause();
    playing_song = false;
    playBtn.innerHTML = '<i class = "fa fa-play"></i>';
}

//next song
function next_song() {
    if (index_no < all_songs.length - 1) {
        index_no = parseInt(index_no) + 1;
        load_track(index_no);
        addSongs();
        playsong();
    } else {
        index_no = 0;
        load_track(index_no);
        addSongs();
        playsong();
    }
}

//previous song
function previous_song() {
    if (index_no > 0) {
        index_no -= 1;
        load_track(index_no);
        addSongs()
        playsong();
    } else {
        index_no = all_songs.length - 1;
        load_track(index_no);
        addSongs()
        playsong();
    }
}
let muted = false;
//change volume
function volume_change() {
    track.volume = volumeRange.value / 100;
    if (volumeRange.value > 50) {
        volumeIconContainer.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true" id="volume_icon" onclick="mute_sound()"></i>'
        muted = false;
    }
    if (volumeRange.value > 0 && volumeRange.value <= 50) {
        volumeIconContainer.innerHTML = '<i class="fa fa-volume-down" aria-hidden="true" id="volume_icon2" onclick="mute_sound()"></i>';
        muted = false;
    }
    if (volumeRange.value == 0) {
        volumeIconContainer.innerHTML = '<i class="fa fa-volume-off" aria-hidden="true" id="volume_icon3" onclick="mute_sound()"></i>';
        muted = true;
    }
}



// change song duration
function change_duration() {
    track.currentTime = songRange.value * (track.duration / 100);
}

//autoplay
function autoplay_switch() {
    if (autoplay == 1) {
        autoplay = 0;
        autoBtn.style.backgroundColor = "rgba(0, 0, 0, 0.59)";
        autoBtn.innerHTML = 'Auto Play <i class="fa fa-pause-circle" aria-hidden="true" id="autoplayIcon"></i>'
    } else {
        autoplay = 1;
        autoBtn.style.backgroundColor = "rgb(56, 12, 64)";
        autoBtn.innerHTML = 'Auto Play <i class="fa fa-play-circle" aria-hidden="true"></i>'
    }
}

function range_slider() {
    let position = 0;
    if (!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration);
        songRange.value = position

    }
    if (track.ended) {
        playBtn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
        if (index_no == all_songs.length - 1) {
            index_no = 0;
        } else {
            index_no = parseInt(index_no) + 1;
        }
        if (autoplay == 1) {
            load_track(index_no);
            addSongs();
            playsong();

        }
    }
}

let trackVolume = 0;
let volumeRangeValue = 0;
function mute_sound() {
    if (track.volume > 0 && muted == false) {
        trackVolume = track.volume;
        volumeRangeValue = volumeRange.value;
        track.volume = 0;
        volumeRange.value = 0;
        volumeIconContainer.innerHTML = '<i class="fa fa-volume-off" aria-hidden="true" id="volume_icon3" onclick="mute_sound()"></i>';
        setTimeout(() => {
            muted = true;
        }, 20);
    }
    if (track.volume == 0 && muted == true) {
        track.volume = trackVolume;
        volumeRange.value = volumeRangeValue
        if (volumeRangeValue > 0 && volumeRangeValue <= 50) {
            volumeIconContainer.innerHTML = '<i class="fa fa-volume-down" aria-hidden="true" id="volume_icon2" onclick="mute_sound()"></i>';
        }
        if (volumeRangeValue > 50) {
            volumeIconContainer.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true" id="volume_icon" onclick="mute_sound()"></i>'
        }
        muted = false
    }
}

let loopSong = false;

function loop_song() {
    if (loopSong == false) {
        track.loop = true;
        loopBtn.style.backgroundColor = "rgb(56 12 64)";
        setTimeout(() => {
            loopSong = true;
        }, 20)
    }
    if (loopSong == true) {
        track.loop = false;
        loopSong = false;
        loopBtn.style.backgroundColor = "#00000096";
    }
}

function addSongs() {
    songsContainer.innerHTML = "";
    let i = 0;
    let x = 1;
    while (i <= index_no) {
        if (i == index_no) {
            if (i == 0) {
                for (let i = 1; i < all_songs.length; i++) {
                    songsContainer.innerHTML += `<div id="${i}" class="songs_div" onclick="idTarget(event)"><p id="${i}" class="p_song_name_class">${all_songs[i].name}</p></div>`;
                }
            }
            if (i == all_songs.length - 1) {
                for (let i = 0; i < all_songs.length - 1; i++) {
                    songsContainer.innerHTML += `<div id="${i}" class="songs_div" onclick="idTarget(event)"><p id="${i}" class="p_song_name_class">${all_songs[i].name}</p></div>`;
                }
            }
            if (i > 0 && i < all_songs.length - 1) {
                x = parseInt(index_no);
                y = parseInt(index_no);
                while (x < all_songs.length - 1) {
                    songsContainer.innerHTML += `<div id="${x + 1}" class="songs_div" onclick="idTarget(event)"><p id="${x + 1}" class="p_song_name_class">${all_songs[x + 1].name}</p></div>`;
                    x++;
                }
                if (x = all_songs.length - 1) {
                    songsContainer.innerHTML += `<div id="0" class="songs_div" onclick="idTarget(event)"><p id="0" class="p_song_name_class">${all_songs[0].name}</p></div>`;
                    x = 0;
                }
                while (x < y - 1) {
                    songsContainer.innerHTML += `<div id="${x + 1}" class="songs_div" onclick="idTarget(event)"><p id="${x + 1}" class="p_song_name_class">${all_songs[x + 1].name}</p></div>`;
                    x++;
                }
            }
        }
        i++
    }
}

//event id target
function idTarget(event) {
    index_no = event.target.id;
    load_track(index_no);
    addSongs();
    playsong();
}

addSongs();

//match media
window.addEventListener("resize", function () {
    if (mainButtons.style.display == "flex" && window.matchMedia("(max-width: 1500px)").matches) {
        mp.style.position = "fixed";
        mp.style.top = "auto";
        mp.style.bottom = "0px";
        mp.style.width = "100%";
        mp.style.padding = "0px 400px 0px 400px";
        mp.style.left = "0px";
        songTimerContainer.style.width = "72%";
        volumeIconContainer.style.width = "5%";
        volumeRangeContainer.style.width = "25%";
        volumeRange.style.width = "80%";
        songImg.style.height = "71.31px";
        if (mainButtons.style.display == "flex" && window.matchMedia("(max-width: 1300px)").matches) {
            mp.style.padding = "0px 300px 0px 300px";
            songImg.style.height = "71.31px";
            if (mainButtons.style.display == "flex" && window.matchMedia("(max-width: 1100px)").matches) {
                mp.style.padding = "0px 250px 0px 250px";
                if (mainButtons.style.display == "flex" && window.matchMedia("(max-width: 900px)").matches) {
                    mp.style.padding = "0px 200px 0px 200px";
                    if (mainButtons.style.display == "flex" && window.matchMedia("(max-width: 790px)").matches) {
                        mp.style.padding = "0px";
                        if (mainButtons.style.display == "flex" && window.matchMedia("(max-width: 313px)").matches) {
                            songImg.style.height = "100%";
                        }
                    }
                }
            }
        }
    }
    if (mainButtons.style.display == "flex" && window.matchMedia("(min-width: 1501px)").matches) {
        mp.style.position = "absolute";
        mp.style.width = "420px"
        mp.style.left = "20px";
        mp.style.top = "170px";
        mp.style.padding = "0px";
        songImg.style.height = "71.31px";
    }
});
//End of Music Player

renderTasks();
function workss() { }

// Calendar Functions

// Function to create a calendar
function createCalendar() {

    const calendar = document.querySelector('.calendar');
    const currentMonthElement = document.querySelector('.current-month');
    const calendarDays = document.querySelector('.calendar-days');
    const prevMonthBtn = document.querySelector('.prev.month-btn');
    const nextMonthBtn = document.querySelector('.next.month-btn');
    const prevYearBtn = document.querySelector('.prev-year');
    const todayBtn = document.querySelector('.today');
    const nextYearBtn = document.querySelector('.next-year');
    const todayDate = document.getElementById('todayDate');
    // const navbarToday = document.getElementById('today');


    // Get the current date
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Event listener for "thisWeek" button
    let thisWeekButton = document.querySelector('.thisWeek');
    thisWeekButton.addEventListener('click', showDaysOfWeek);

    // Event listeners for month navigation buttons
    prevMonthBtn.addEventListener('click', showPreviousMonth);
    nextMonthBtn.addEventListener('click', showNextMonth);

    // Event listeners for year navigation buttons
    prevYearBtn.addEventListener('click', showPreviousYear);
    todayBtn.addEventListener('click', showCurrentMonth);
    todayBtn.addEventListener('click', toggleTodayDate);
    nextYearBtn.addEventListener('click', showNextYear);
    // navbarToday.addEventListener('click', createCalendar);

    // Display the current month and year
    displayCurrentMonth();

    // Function to display the current month and year
    function displayCurrentMonth() {
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        currentMonthElement.textContent = monthNames[currentMonth] + ' ' + currentYear;

        calendarDays.innerHTML = '';

        let firstDay = new Date(currentYear, currentMonth, 1).getDay();
        let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Create calendar days
        for (let day = 1; day <= daysInMonth; day++) {
            const calendarDay = document.createElement('div');
            calendarDay.classList.add('calendar-day');
            calendarDay.textContent = day;
            calendarDay.setAttribute('data-day', day); // Add data-day attribute

            calendarDays.appendChild(calendarDay);
        }


        // Add empty cells for the days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('empty-cell');
            calendarDays.appendChild(emptyCell);
        }
    }

    //function to show only days of one week

    function showDaysOfWeek() {

        calendarDays.innerHTML = '';

        let currentDate = new Date();

        // Get the first day of the current week
        let firstDayOfWeek = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - currentDate.getDay()
        );

        // Get the days of the week
        for (let i = 0; i < 7; i++) {
            let date = new Date(
                firstDayOfWeek.getFullYear(),
                firstDayOfWeek.getMonth(),
                firstDayOfWeek.getDate() + i
            );
            let calendarDay = document.createElement('div');
            calendarDay.classList.add('calendar-day');
            calendarDay.textContent = date.getDate();
            calendarDays.appendChild(calendarDay);
        }
    }
    //Get today date

    function toggleTodayDate() {
        let todayDateElement = document.getElementById('todayDate');
        let currentDate = new Date();
        let currentDay = currentDate.getDate();
        let currentMonth = currentDate.getMonth() + 1;
        let currentYear = currentDate.getFullYear();
        let formattedDate = "Date: " + currentDay + '/' + currentMonth + '/' + currentYear;
        todayDateElement.textContent = formattedDate;

        let currentCalendarDay = document.querySelector(`[data-day="${currentDay}"]`);
        currentCalendarDay.style.border = '2px solid black';
        currentCalendarDay.style.borderRadius = '15px';
        currentCalendarDay.style.backgroundColor = 'rgb(10, 212, 212)';
        currentCalendarDay.style.color = 'rgb(7, 2, 20)';
        currentCalendarDay.style.transition = '0.3s';
        currentCalendarDay.style.cursor = 'pointer';
        currentCalendarDay.style.boxShadow = 'inset 0px 0px 0px 1.5px rgb(10, 212, 212)';
    }



    // Function to show the previous month
    function showPreviousMonth() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        displayCurrentMonth();
    }

    // Function to show the next month
    function showNextMonth() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        displayCurrentMonth();
    }

    // Function to show the previous year
    function showPreviousYear() {
        currentYear--;
        displayCurrentMonth();
    }

    // Function to show the next year
    function showNextYear() {
        currentYear++;
        displayCurrentMonth();
    }

    // Function to show the current month
    function showCurrentMonth() {
        currentMonth = currentDate.getMonth();
        currentYear = currentDate.getFullYear();
        displayCurrentMonth();
    }
}

// Call the createCalendar
createCalendar()

//add event listener for close button


//Show calendar on click on today 
//how to hide everything elsee
let showCalendar = document.getElementById('showCallendarBtn');
showCalendar.addEventListener('click', function () {
    showButtonById('card')
    hideButtonById('displayReminders')
    hideButtonById('reminderList')
    document.getElementById("centeredContainer").style.display = "none";
    if (document.getElementById("start").textContent != "Start") {
        timer2.hidden = false;
        showButtonById('timer2');
    }
});
document.getElementById('closeCalendarBtn').addEventListener('click', function () {
    hideCalendar();
    timerAndTaskBarDiv.style.display = 'flex';
    hideButtonById('timer2')

})

// function toggleCalendar() {
//     let calendar = document.getElementById('card');
//     if (calendar.style.display === 'none') {
//         calendar.style.display = 'block';
//         document.getElementById("centeredContainer").style.display = "none";
//         if (document.getElementById("start").textContent != "Start") {
//             timer2.hidden = false;
//             showButtonById('timer2');
//         };
//     } else {
//         calendar.style.display = 'none';
//         hideButtonById('timer2');

//         document.getElementById("centeredContainer").style.display = "flex";

//     }
// }

function blockButtons() {
    document.querySelector("#shortBreakSession").disabled = true;
    document.querySelector("#longBreakSession").disabled = true;
    document.querySelector("#workSession").disabled = true;
    document.querySelector("#start").disabled = true;
    document.querySelector("#start").innerHTML = "Start";
}

