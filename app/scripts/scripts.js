$(document).ready(function () {

    $('#newTaskForm').hide();

    var newToDosCount = 0;
    var inProgressCount = 0;
    var completeCount = 0;

    var listo = [];
    var Task = function (task) {
        this.task = task;
        this.id = 'new';
    };

    var updateNewCount = function () {
        return $('#newToDosCount').text(newToDosCount);
    };
    updateNewCount();
    var updateInProgressCount = function () {
        return $('#inProgressCount').text(inProgressCount);
    };
    updateInProgressCount();
    var updateCompleteCount = function () {
        return $('#completeCount').text(completeCount);
    };
    updateCompleteCount();
    var advanceTask = function (task) {
        var modified = task.innerText.trim()
        for (var i = 0; i < listo.length; i++) {
            if (listo[i].task === modified) {
                if (listo[i].id === 'new') {
                    listo[i].id = 'inProgress';

                } else if (listo[i].id === 'inProgress') {
                    listo[i].id = 'archived';

                } else {
                    listo.splice(i, 1);

                }
                break;
            }
        }
        task.remove();
    };

    var addTask = function (task) {
        if (task) {
            task = new Task(task);
            listo.push(task);
            $('#newItemInput').val('');
            $('#newList').append(
                '<a href="#finish" class="" id="item">' +
                '<li class="list-group-item">' +
                '<h3>' + task.task + '</h3>' +
                '<span class="arrow pull-right">' +
                '<i class="glyphicon glyphicon-arrow-right">' +
                '</span>' +
                '</li>' +
                '</a>'
            );

        }
        $('#newTaskForm').slideToggle('fast', 'linear');
    };

    $('#saveNewItem').on('click', function (event) {
        event.preventDefault();
        var task = $('#newItemInput').val().trim();
        addTask(task);
        newToDosCount += 1;
        console.log(newToDosCount);
        updateNewCount();
    });

    $('#add-todo').on('click', function (event) {
        $('#newTaskForm').fadeToggle('fast', 'linear');
    });
    $('#cancel').on('click', function (event) {
        event.preventDefault();
        $('#newTaskForm').fadeToggle('fast', 'linear');
    });

    $(document).on('click', '#item', function (e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
        this.id = 'inProgress';
        $('#currentList').append(this.outerHTML);
        newToDosCount -= 1;
        inProgressCount += 1;
        updateNewCount();
        updateInProgressCount();
        updateCompleteCount();
    });

    $(document).on('click', '#inProgress', function (e) {
        e.preventDefault();
        var task = this;
        task.id = "archived";
        var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
        advanceTask(task);
        $('#archivedList').append(changeIcon);
        inProgressCount -= 1;
        completeCount += 1;
        updateNewCount();
        updateInProgressCount();
        updateCompleteCount();
    });

    $(document).on('click', '#archived', function (e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
        completeCount -= 1;
        updateNewCount();
        updateInProgressCount();
        updateCompleteCount();
    });


});
