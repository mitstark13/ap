import React from 'react';

class News extends React.Component {
	constructor(props) {
	    super(props)
	    this.state = {
	    	stories: [],
	    	titles: [],
	    	descriptions: [],
	    	links: [],
	    	dates: [],
	    	limit: 20
	    }
	}

	componentWillMount () {
		$(function () {
			let stories = []
			let final = ''
			let req = new XMLHttpRequest();
			req.open('GET', 'http://intranet.altour.com/news3/ClientNewsRss.cfm', false);
			req.send(null);
			if(req.status == 200) {
				//Make the following code cleaner at some point...
				for (var i = 1; i < this.state.limit; i++) {
					//Replacing a substring was not working
					let title = req.responseText.split('>title<')[i+1].split('XmlText</td><td>')[1].split('</td>')[0].replace(/&pound;/g, '£').replace(/&rsquo;/g, "'").replace(/&eacute;/g, 'e').replace(/&mdash;/g, '---').replace(/&nbsp;/g, ' ').replace(/&ldquo;|&rdquo;/g, '"')
					this.state.titles.push(title)
					this.state.dates.push(req.responseText.split('pubDate')[i].split('XmlText</td><td>')[1].split('</td>')[0].split('00:00:00')[0])
					let item = req.responseText.split('XmlText</td><td><p>')[i].split('</td>')[0].replace(/&ndash;/g, '-').replace(/&pound;/g, '£').replace(/&rsquo;/g, "'").replace(/&eacute;/g, 'e').replace(/&mdash;/g, '---').replace(/&nbsp;/g, ' ').replace(/&ldquo;|&rdquo;/g, '"')
					if (item.indexOf('Apple') < 0) {
						item = item.replace(/<.*?>/g, '')
						this.state.links.push(item.split('http')[1])
						this.state.descriptions.push(item.split('http')[0])
					}
				}
				console.log("# of Titles: " + this.state.titles.length)
				console.log("# of Links: " + this.state.links.length)
				console.log("# of Descriptions: " + this.state.descriptions.length)
				console.log("# of Dates: " + this.state.dates.length)
			}
			for (var i=0; i < this.state.links.length; i++) {
				if (this.state.descriptions[i]) {stories.push([this.state.links[i], this.state.descriptions[i], this.state.dates[i], this.state.titles[i]])}
			}
			this.setState({stories: stories})
		}.bind(this))
	}

	componentDidMount() {
	  $(window).scrollTop(440);
	}

	render () {
		//Create a "LOAD MORE" function

		return (
			<div className='news'>
				<h1>Altour News</h1>
				{this.state.stories.map(function(i, idx) {
					let link = ('http' + i[0])
					return (
						<div key={idx} className='newsStory'>
						<h2>{i[3]}</h2>
						<p>{i[2]}</p>
						<p>{i[1]}</p>
						<a href={link} target="_blank">Full Story ></a>
						</div>
					)
				})}
				<p>For more news, visit <a href="http://intranet.altour.com/news3/ClientNewsRss.cfm" target='_blank'>http://intranet.altour.com/news3/ClientNewsRss.cfm</a></p>
			</div>
		)
	}
}

export default News;