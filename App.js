import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            portalId: 0,
            custom: [],
            forms: [],
            imgs: [],
            formImg: []
        }
    }
    componentWillMount() {
        var cname = location.host.split('.')[0]
        console.log('cname: ' + cname)

        fetch('custom.json')
            .then((res) => res.json())
            .then((data) => {
            this.setState({
              formImg: data.starkey.forms
            });
            for (var i=1; i<=4; i++) {
                // console.log(this.state.formImg);
                $('.main .forms a:nth-child(' + i + ')').attr('src', this.state.formImg[i-1].img);
            }
        });

    //NEW
        let allLinks = []
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
                                  custom: data[i],
                                  portalId: data[i].id
                                })
                            }
                        }

                        $.ajax({
                            url: 'http://10.200.22.119:1337/portalLink',
                            dataType: 'json',
                            success: ((data) => {
                                let links = []
                                for (let i=0; i<data.length; i++) {
                                    if ((data[i].portalId === this.state.portalId) && (data[i].imageId)) {
                                        document.getElementById("companyLogo").src = "http://10.200.22.119:1337/image?id=" + data[i].imageId
                                    }
                                    if ((data[i].portalId === this.state.portalId) && (data[i].linkTypeId === undefined)) {
                                        let targetLink = data[i].linkId

                                        for (let x=0; x<allLinks.length; x++) {
                                            // console.log(allLinks[x])
                                            
                                            if (allLinks[x].id === targetLink) {
                                                if (allLinks[x].link.substring(0, 3) != "http") {
                                                    allLinks[x].link = "http://" + allLinks[x].link
                                                }
                                                links.push(allLinks[x])
                                            }
                                        }
                                        this.setState({forms: links})
                                    }
                                }
                            })
                        })
                    })
                })

            })
        })
    }

    componentDidMount() {
        for (var i=1; i<=4; i++) {
            // console.log(this.state.formImg);
            // $('.main .forms a:nth-child(' + i + ')').attr('src', this.state.formImg[i-1].img);
        }
    }

    render() {
    	return (
    		<section className='home'>
                <h1 className='homeHeader'>Welcome to the {this.state.custom.name} Travel Portal</h1>
                <p className='welcomeMessage'>{this.state.custom.welcomeMessage}</p>
                
                <div className='main'>
                    <section className='forms'>
                        {this.state.forms.map(function(i, idx) {
                            return (
                                    <a href={i.link} key={idx} target='_blank'>
                                        <h1>{i.title}</h1>
                                        <p>{i.description}</p>
                                        <img src={this.state.formImg[idx].img} alt='form' />
                                    </a>
                                )
                    }.bind(this))}
                    </section>
                    <aside className='assistance'>
                        <div className='companyInfo'>
                            <h1>TRAVEL ASSISTANCE</h1>
                            <p>{this.state.custom.assistanceInfo}</p>
                        </div>
                        <div className='quickLinks'>
                            <Link to='flights'>
                                <img src='img/flightTrack-01.png' />
                                <p>Flight status</p>
                            </Link>
                            <Link to='delays'>
                                <img src='img/flightDelays.png' />
                                <p>Flight delays</p>
                            </Link>
                            <Link to='news'>
                                <img src='img/altourNews.png' />
                                <p>Altour News</p>
                            </Link>
                            <Link to='guide'>
                                <img src='img/travelGuide.png' />
                                <p>Travel Guide</p>
                            </Link>
                        </div>
                    </aside>
                </div>
            </section>
    	)
    }
}

export default Home