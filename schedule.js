$(document).ready(function() {
    //initialize the calendar
    $("#calendar").fullCalendar({
        header:{
            left:'prev,next,today',
            centre:'title',
            right:'month,agendaWeek,agendaDay',
            selectable: true,
            selectHelper: true,
            timezone:'GMT+3',
            nowIndicator: true,
            eventOverlap:false,
            events:[
                //preexisting booked events can appear here
            ],
            select: function(start,end){
                //check if the selected time is available
                if(isTimeSlotAvailable(start,end)){
                    var eventData = {
                        title: 'Lesson',
                        start: start,
                        end: end,
                        allDay: false
                    }
                    //send an ajax request to save the booking data
                    $.ajax({
                        url:'save_booking.php',
                        type:'POST',
                        data:eventData,
                        success:function(response){
                            if(response.success){
                                $('#calendar').fullCalendar('renderEvent',eventData,true);
                                $('#calendar').fullCalendar('unselect')
                                alert('Event saved successfully')
                            }else{
                                alert('Error: ' + response.message)
                            }
                        },
                        error: function(){
                            alert('Error:Unable to save booking!!!')
                        }
                    })
                    //add a new event to the calendar
                    /*
                    $('#calendar').fullCalendar('renderEvent',{
                        title:'Lesson',
                        start:start,
                        end:end,
                        allDay:false
                    },true)*/
                }else{
                    alert("The timeslot is not available or booked!");
                }
                //$('#calendar').fullCalendar('unselected')
                

            },
            eventRender:function(event, element){
                //add a class to the event element
                event.addClass('scheduled-event')
            }
        }
    })

    function isTimeSlotAvailable(start,end) {
        //check if the time slot is during night hours
        var startHour =moment(start).hour();
        var endHour =moment(end).hour();
        if (startHour>=22 || endHour>=22||startHour<6||endHour<6) {
            return false;
        }
        //check if the time slot overlaps with existing events
        var events=$('#calendar').fullCalendar("clientEvents")
        for(var i=0; i<events.length; i++) {
            if((start>=events[i].start && start<=events[i].end)|| (end>events[i].start && end<=events[i].end)) {
                return false;// the time slot is not available as it overlaps the existing event
            }
        }
        return true;
    }

    
});
