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


for (let i = 0; i < localStorage.length; i++) {
    local_storage_keys.push(parseInt(localStorage.key(i)));
}


(function show_tasks(){
    task_keys.forEach((item, index) => {
        text1 = localStorage.getItem(item);
        task_bx.innerHTML += `
        <div class="task" id="task_${item}" style="animation-delay:${index * 0}ms !important">
            <p>${text1}</p> 
            <span class="complete" id="task_${item}_complete" onclick = 'complete_task(${item})'><i class="far fa-check-circle"></i></span>
        </div>  
        `
    })

    if(!task_keys.length) {
        task_bx.innerHTML = `
        <div id='task_placeholder_bx'>
            <p class="task_placeholder_text">
                You  don't have any tasks currently . 
            </p>
        </div>`
    }

    task_count.innerHTML = task_keys.length;
})();

(function show_done(){

    done_task_keys.forEach((item, index) => {
        text2 = localStorage.getItem(item);
        done_bx.innerHTML += `
        <div class="done" id="done_${item}" style='animation-delay:${index * 0}ms !important'>
            <p>${text2}</p>
            <span class="delete" id="done_delete_${item}" onclick="delete_task(${item})"><i class="far fa-trash-alt"></i></span>
        </div>
        `
        return;
    })

    if(!done_task_keys.length){
        done_bx.innerHTML = `
        <div id='done_placeholder_bx'>
            <p class="done_placeholder_text">
                Nothing done here . 
            </p>
        </div>`
    }

    done_count.innerHTML = done_task_keys.length;
})();


function add_task(text_id) {

    if(document.getElementById('task_placeholder_bx')){
        document.getElementById('task_placeholder_bx').remove();
    }


    form = document.getElementById(`${text_id}`);
    text = form.value;
    task_no = parseInt(local_storage_keys[local_storage_keys.length - 1]) ? Math.max.apply(Math, local_storage_keys) + 1 : 1;

    // test_regex = /(.*[a-z]){3}/;
    // test_validity = text.match(test_regex);

    if (!text.trim() && text.trim() <= 3) {
        alert("Task should be more than 3 letters . ");
        return;
    } else {
        localStorage.setItem(task_no, text);
        local_storage_keys.push(task_no);
        task_keys.push(task_no);
        localStorage['task'] = task_keys;
        task_bx.innerHTML += `
        <div class="task" id="task_${task_no}" style='animation-delay:${task_keys.length * 0}ms !important'>
            <p>${text}</p>
            <span class="complete" id="task_${task_no}_complete" onclick = 'complete_task(${task_no})'><i class="far fa-check-circle"></i></span>
        </div>
        `
        form.value = '';
    }

    task_count.innerHTML = task_keys.length;
}


function delete_task(key) {

    index_in_done = done_task_keys.indexOf(key);

    if (index_in_done >= 0) {

        localStorage.removeItem(`${key}`);
        document.getElementById(`done_${key}`).remove();
        done_task_keys.splice(index_in_done, 1);
        localStorage['done'] = done_task_keys;

    } else {
        return 'Invalid Operation .'
    }

    if(!done_task_keys.length){
        done_bx.innerHTML = `
        <div id='done_placeholder_bx'>
            <p class="done_placeholder_text">
                Nothing done here . 
            </p>
        </div>`
    }

    done_count.innerHTML = done_task_keys.length;
}


function complete_task(key) {

    if(document.getElementById('done_placeholder_bx')){
        document.getElementById('done_placeholder_bx').remove();
    }

    task_keys.splice(task_keys.indexOf(key), 1);
    localStorage['task'] = task_keys;

    done_task_keys.push(key);
    localStorage['done'] = done_task_keys;

    text = localStorage.getItem(key);

    document.getElementById(`task_${key}`).remove();
    document.getElementById(`done_bx`).innerHTML += `
    <div class="done" id="done_${key}" style='animation-delay:${done_task_keys.length * 0}ms !important'>
        <p>${text}</p>
        <span class="delete" id="done_delete_${key}" onclick='delete_task(${key})'><i class="far fa-trash-alt"></i></span>
    </div>
    `

    if(!task_keys.length){
        task_bx.innerHTML = `
        <div id='task_placeholder_bx'>
            <p class="task_placeholder_text">
                You  don't have any tasks currently . 
            </p>
        </div>`
    }

    task_count.innerHTML = task_keys.length;
    done_count.innerHTML = done_task_keys.length;
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