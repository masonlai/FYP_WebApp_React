import React from 'react';

import ImageGallery from 'react-image-gallery';
import "../../../node_modules/react-image-gallery/styles/scss/image-gallery.scss";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import ResponsiveEmbed from 'react-responsive-embed'


{/*this function is for displaying the medias which were uploaded by user*/}
class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showIndex: false,
            showBullets: true,
            infinite: true,
            showThumbnails: true,
            showFullscreenButton: true,
            showGalleryFullscreenButton: true,
            showPlayButton: true,
            showGalleryPlayButton: true,
            showNav: true,
            isRTL: false,
            slideDuration: 450,
            slideInterval: 2000,
            slideOnThumbnailOver: false,
            thumbnailPosition: 'bottom',
            showVideo: {},
        };

    }


    componentDidUpdate(prevProps, prevState) {
        if (this.state.slideInterval !== prevState.slideInterval ||
            this.state.slideDuration !== prevState.slideDuration) {
            // refresh setInterval
            this._imageGallery.pause();
            this._imageGallery.play();
        }
    }

    _resetVideo() {
        this.setState({showVideo: {}});

        if (this.state.showPlayButton) {
            this.setState({showGalleryPlayButton: true});
        }

        if (this.state.showFullscreenButton) {
            this.setState({showGalleryFullscreenButton: true});
        }
    }

    _toggleShowVideo(url) {
        console.log(this.state.images);
        this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
        this.setState({
            showVideo: this.state.showVideo
        });

        if (this.state.showVideo[url]) {
            if (this.state.showPlayButton) {
                this.setState({showGalleryPlayButton: false});
            }

            if (this.state.showFullscreenButton) {
                this.setState({showGalleryFullscreenButton: false});
            }
        }
    }

    _renderVideo(item) {
        return (
                       <div className='video-wrapper'>
                            <a
                                className='close-video'
                                onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
                            >
                            </a>
                           <ResponsiveEmbed src={item.embedUrl} allowFullScreen/>
                        </div>
        );
    }

    imageHandle(list) {
        let newlist = list.map(function (item) {
            return {
                original: item,
                thumbnail: item,
            }
        });
        return newlist
    }

    youtubeVideoHandle(list) {

        const newlist=[];
        for (let i = 0; i < list.length; i++) {
            newlist.push({
                thumbnail: 'https://img.youtube.com/vi/' + list[i] + '/hqdefault.jpg',
                original: 'https://img.youtube.com/vi/' + list[i] + '/hqdefault.jpg',
                embedUrl: 'https://www.youtube.com/embed/' + list[i],
                renderItem: this._renderVideo.bind(this)
            })
        }
        return newlist
    }


    render() {
        return (

            <section className='app'>
                <ImageGallery
                    ref={i => this._imageGallery = i}
                    items={this.youtubeVideoHandle(this.props.media.video).concat(this.imageHandle(this.props.media.images_url))}
                    lazyLoad={false}
                    infinite={this.state.infinite}
                    showBullets={this.state.showBullets}
                    showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
                    showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
                    showThumbnails={this.state.showThumbnails}
                    showIndex={this.state.showIndex}
                    showNav={this.state.showNav}
                    isRTL={this.state.isRTL}
                    thumbnailPosition={this.state.thumbnailPosition}
                    slideDuration={parseInt(this.state.slideDuration)}
                    slideInterval={parseInt(this.state.slideInterval)}
                    slideOnThumbnailOver={this.state.slideOnThumbnailOver}
                    additionalClass="app-image-gallery"
                />

            </section>
        );
    }
}

export default Gallery