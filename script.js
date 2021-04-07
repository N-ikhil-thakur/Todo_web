date = new Date();
days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
months = ['january', 'february', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

day = days[date.getDay()];
tarik = date.getDate();
month = months[date.getMonth()];
year = date.getFullYear();

document.getElementById('date').innerHTML = `${day} , ${tarik} ${month} ${year}`;




task_bx = document.getElementById('task_bx');
done_bx = document.getElementById('done_bx');

task_count = document.getElementById('task_count');
done_count = document.getElementById('done_count');


let local_storage_keys = [];
for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) == 'done' || localStorage.key(i) == 'task') continue;
    local_storage_keys.push(parseInt(localStorage.key(i)));
}


let done_task_keys = localStorage.getItem('done') ? (get_done_task_keys => {
    str_arr = localStorage.getItem('done').split(',');
    req_arr = str_arr.map(Number);
    return req_arr;
})() : [];


let task_keys = localStorage.getItem('task') ? (get_task_keys => {
    str_arr = localStorage.getItem('task').split(',');
    req_arr = str_arr.map(Number);
    return req_arr;
})() : [];



let add_task_keys = (key) => {
    task_keys.unshift(key);
    localStorage['task'] = task_keys;
}

let delete_task_keys = (key) => {
    task_keys.splice(task_keys.indexOf(key), 1);
    localStorage['task'] = task_keys;
}

let add_done_task_keys = (key) => {
    done_task_keys.unshift(key);
    localStorage['done'] = done_task_keys;
}

let delete_done_task_keys = (key) => {
    done_task_keys.splice(done_task_keys.indexOf(key), 1);
    localStorage['done'] = done_task_keys;
}



let no_task_placeholder_markup = `
    <div id='task_placeholder_bx'>
        <p class="task_placeholder_text">
            You  don't have any tasks currently . 
        </p>
    </div>`


let no_done_placeholder_markup = `
    <div id='done_placeholder_bx'>
        <p class="done_placeholder_text">
            Nothing done here . 
        </p>
    </div>`;



let new_task_markup = (key,text) => {
    return `<div class="task" id="task_${key}" ">
                <p>${text}</p> 
                <span class="complete" id="task_${key}_complete" onclick = 'complete_task(${key})'>
                    <i class="far fa-check-circle"></i>
                </span>
            </div>`
}


let new_done_markup = (key,text) => {
    return `<div class="done" id="done_${key}"'>
                <p>${text}</p>
                <span class="delete" id="done_delete_${key}" onclick="delete_task(${key})">
                    <i class="far fa-trash-alt"></i>
                </span>
            </div>`
}

//shows all the tasks 
(function show_tasks() {
    task_keys.forEach((item, index) => {
        text = localStorage.getItem(item);
        task_bx.innerHTML += new_task_markup(item,text) ;
    })

    if (!task_keys.length) {
        task_bx.innerHTML  = no_task_placeholder_markup;
    }

    task_count.innerHTML = task_keys.length;
})();



//shows all the tasks done 
(function show_done() {

    done_task_keys.forEach((item, index) => {
        text = localStorage.getItem(item);
        done_bx.innerHTML += new_done_markup(item,text);
        return;
    })

    if (!done_task_keys.length) {
        done_bx.innerHTML = no_done_placeholder_markup;
    }

    done_count.innerHTML = done_task_keys.length;
})();


// adds new task 
function add_task(text_id) {

    if (document.getElementById('task_placeholder_bx')) {
        document.getElementById('task_placeholder_bx').remove();
    }

    form = document.getElementById(`${text_id}`);
    text = form.value;
    task_no = (local_storage_keys.length != 0) ? Math.max.apply(Math, local_storage_keys) + 1 : 1;

    if (!text.trim() && text.trim() <= 3) {
        alert("Task should be more than 3 letters . ");
        return;
    } else {
        localStorage.setItem(task_no, text);
        local_storage_keys.push(task_no);
        add_task_keys(task_no);

        task_bx.innerHTML = new_task_markup(task_no,text)+ task_bx.innerHTML;

        form.value = '';
    }

    task_count.innerHTML = task_keys.length;
}



// adds targeted task to done and removes from task 
function complete_task(key) {

    if (document.getElementById('done_placeholder_bx')) {
        document.getElementById('done_placeholder_bx').remove();
    }

    delete_task_keys(key);
    add_done_task_keys(key);
    document.getElementById(`task_${key}`).remove();

    text = localStorage.getItem(key);
    done_bx.innerHTML = new_done_markup(key,text) + done_bx.innerHTML;

    if (!task_keys.length) {
        task_bx.innerHTML = no_task_placeholder_markup;
    }

    task_count.innerHTML = task_keys.length;
    done_count.innerHTML = done_task_keys.length;
}


// deletes targeted task 
function delete_task(key) {
    index_in_done = done_task_keys.indexOf(key);

    if (index_in_done >= 0) {

        local_storage_keys.splice(local_storage_keys.indexOf(key), 1);
        localStorage.removeItem(`${key}`);
        document.getElementById(`done_${key}`).remove();
        delete_done_task_keys(key);

    }

    if (!done_task_keys.length) {
        done_bx.innerHTML = no_done_placeholder_markup;
    }

    done_count.innerHTML = done_task_keys.length;
}


// deletes all the task listed in done_tasks list 
function delete_completed() {
    for (i in done_task_keys) {
        if (local_storage_keys.indexOf(done_task_keys[i]) >= 0) {
            local_storage_keys.splice(local_storage_keys.indexOf(done_task_keys[i]), 1);
        }

        localStorage.removeItem(done_task_keys[i]);
    }
    done_task_keys = [];
    localStorage['done'] = done_task_keys;
    done_count.innerHTML = done_task_keys.length;
    done_bx.innerHTML = no_done_placeholder_markup;
}



// below three functions can be done in lesser code jus have to think a little 
// but it works completely fine .

function enable_disable() {
    element = document.querySelector('.active');
    id = element.id;
    if (id == 'task_header') {
        target = document.querySelector("[data-linked = 'task_bx']");
        target.classList.remove('hidden')
        document.querySelector("[data-linked = 'done_bx']").classList.add('hidden');
    }
    if (id == 'done_header') {
        target = document.querySelector("[data-linked = 'done_bx']");
        target.classList.remove('hidden')
        document.querySelector("[data-linked = 'task_bx']").classList.add('hidden');
    }

}

function toggle_hide_show(...args) {
    args.forEach(id => {
        document.getElementById(`${id}`).classList.toggle('hidden');
    })
}


function switch_active(on, off) {
    document.getElementById(`${on}_bx`).classList.add('active');
    document.getElementById(`${on}_header`).classList.add('active');
    document.getElementById(`${off}_bx`).classList.remove('active');
    document.getElementById(`${off}_header`).classList.remove('active');
}