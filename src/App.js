import React, { Component, Fragment } from 'react';
import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'

class App extends Component {

	state = {
		novoTweet: '',
		listaTweet: []
	};

	novoTweetEstaValido() {
		const novoTweetLength = this.state.novoTweet.length;
		return novoTweetLength <= 140 && novoTweetLength > 0;
	}

	handleCriaTweet = (event) => {
		event.preventDefault();

		this.setState({
			listaTweet: [...this.state.listaTweet, this.state.novoTweet],
			novoTweet: '',
		});
	}

	render() {
		return (
			<Fragment>
				<Cabecalho>
					<NavMenu usuario="@omariosouto" />
				</Cabecalho>
				<div className="container">
					<Dashboard>
						<Widget>
							<form className="novoTweet" onSubmit={this.handleCriaTweet}>
								<div className="novoTweet__editorArea">
									<span className={`novoTweet__status ${this.novoTweetEstaValido() ? '' : 'novoTweet__status--invalido'}`}>
										{this.state.novoTweet.length}/140
									</span>
									<textarea 
										className="novoTweet__editor" 
										placeholder="O que está acontecendo?"
										onChange={(event) => this.setState({novoTweet:event.target.value})}
										value={this.state.novoTweet}
									></textarea>
								</div>
								<button 
									type="submit" 
									className={`novoTweet__envia `}
									disabled={!this.novoTweetEstaValido()}
								>Tweetar</button>
							</form>
						</Widget>
						<Widget>
							<TrendsArea />
						</Widget>
					</Dashboard>
					<Dashboard posicao="centro">
						<Widget>
							<div className="tweetsArea">

								{
									this.state.listaTweet.map((tweet, index) =>
										<Tweet
											key={`Tweet-${index}`}
											nomeUsuario="Tatiane Pirico"
											userName="@tatianepirico"
											totalLikes={2}
											avatarUrl={'https://stickershop.line-scdn.net/stickershop/v1/product/925/LINEStorePC/main.png;compress=true'}
											>
											<p className="tweet__conteudo">
												<span>{tweet}</span>
											</p>
										</Tweet>
									)
								}
							</div>
						</Widget>
					</Dashboard>
				</div>
			</Fragment>
		);
	}
}

export default App;
