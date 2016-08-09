import React from 'react';

class Manager extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            portalId: 0,
            managerLinks: []
        }
    }
    componentWillMount() {
        var cname = location.host.split('.')[0]
        console.log('cname: ' + cname)

    //NEW
        let allLinks = []
        let managerLinks = []

        $.ajax({
            url: 'http://10.200.22.119:1337/link',
            dataType: 'json',
            success: ((data) => {
                allLinks = data
                $.ajax({
                    url: 'http://10.200.22.119:1337/portal',
                    dataType: 'json',
                    success: ((data) => {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].cname === cname) {
                                this.setState({
                                  portalId: data[i].id
                                })
                            }
                        }

                        $.ajax({
                            url: 'http://10.200.22.119:1337/portalLink',
                            dataType: 'json',
                            success: ((data) => {
                                for (let i=0; i<data.length; i++) {
                                    if (data[i].portalId === this.state.portalId) {
                                        let targetLink = data[i].linkId
                                        let targetType = data[i].linkTypeId

                                        for (let x=0; x<allLinks.length; x++) {
                                            // console.log(allLinks[x])
                                            if ((allLinks[x].id === targetLink) && (targetType < 6)) {
                                                // console.log(allLinks[x]);
                                                // console.log(targetType);
                                                managerLinks.push([targetType, allLinks[x].link])
                                            }
                                        }
                                    }
                                }
                                this.setState({managerLinks: managerLinks});
                            })
                        })
                    })
                })

            })
        })
    }

	render () {
		return (
			<div className='manager'>
				<h1>Welcome to the Travel Manager Tools</h1>
				
				<section className='managerTools'>
					<a href='#' target='_blank'>
                        <h1>Human Resourses</h1>
                        <p>Hiring, administration, and training of personnel</p>
                        <img src="../img/HR.jpg" alt="HR"/>
                    </a>
                    <a href='#' target='_blank'>
                        <h1>Reporting</h1>
                        <p>Travel reporting figures</p>
                        <img src="../img/Reporting.jpg" alt="Reporting"/>
                    </a>
                    <a href='#' target='_blank'>
                        <h1>Preferred Suppliers</h1>
                        <p>Preferred suppliers of flights, cars, and hotels</p>
                        <img src="../img/suppliers.jpg" alt="Suppliers"/>
                    </a>
                    <a href='#' target='_blank'>
                        <h1>Expense Reporting</h1>
                        <p>Accounts for all the expenses a business incurs</p>
                        <img src="../img/expense-reporting.jpg" alt="Expense reporting"/>
                    </a>
                    <a href='#' target='_blank'>
                        <h1>Benchmarking</h1>
                        <p>Look for improvements, analyze other organizations, and use this information to improve performance</p>
                        <img src="../img/Benchmarking.jpg" alt="Benchmarking"/>
                    </a>
                    {this.state.managerLinks.map(function(link, idx) {
                        for (let i = 1; i <= 5; i++) {
                            if (link[0] === i) {
                                let correctLink = link[1]

                                if (correctLink.substring(0, 3) != "http") {
                                    correctLink = "http://" + correctLink
                                }
                                
                                $('.managerTools a:nth-child(' + i + ')').attr('href', correctLink)
                            }
                        }
                    }.bind(this))}
				</section>
			</div>
		)
	}
}

export default Manager;