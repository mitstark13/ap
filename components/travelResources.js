import React from 'react';

class Resources extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          portalID: 0,
          resources: []
        }
    }
    componentWillMount() {

        var cname = location.host.split('.')[0]
        console.log('cname: ' + cname)

    //NEW
        let allLinks = []
        let finalLinks = []

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
                                            if ((allLinks[x].id === targetLink) && (targetType === 6)) {
                                                if (allLinks[x].link.substring(0, 3) != "http") {
                                                    allLinks[x].link = "http://" + allLinks[x].link
                                                }
                                                finalLinks.push(allLinks[x])
                                            }
                                        }
                                    }
                                }
                                this.setState({resources: finalLinks});
                            })
                        })
                    })
                })

            })
        })
    }
	render () {
		return (
			<div className='resources'>
                <h1 className='title'>Travel Resources</h1>

				{this.state.resources.map(function(i, idx) {
					return (
						<a href={i.link} key={idx} target='_blank'>
                          <h1>{i.title}</h1>
                        </a>
					)
				})}
			</div>
		)
	}
}

export default Resources