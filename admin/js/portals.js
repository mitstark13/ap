$(document).ready(function () {
	console.log('Portals loading')

	var cname = location.host.split('.')[0]
    console.log('cname: ' + cname)

//NEW

    $.ajax({
        url: 'http://10.200.22.119:1337/portal',
        dataType: 'json',
        success: ((data) => {
            for (var i = 0; i < data.length; i++) {
            	$('#portalTable tr:last-of-type').after("<tr><td>" + data[i].id + "</td><td><img src='img/altourLogo.png' alt='ALTOUR'></td><td>"+ data[i].name +"</td><td><a href='http://" + data[i].cname + ".localhost:1313/index.html'>" + data[i].cname + ".altourportal.com</a></td><td>Enabled</td><td class='actions'><img src='img/disable.svg' alt='Disable'><img src='img/edit.svg' alt='Edit'><img src='img/trash.svg' alt='Trash'></td></tr>")
            }
        })
    })

    $('.portalsNav').on('click', function() {
    	$('html, body').animate({
	        scrollTop: $("#portalsTable").offset().top
	    }, 1200);
    })

    $('.usersNav').on('click', function() {
    	$('html, body').animate({
	        scrollTop: $("#usersTable").offset().top
	    }, 1200);
    })
})