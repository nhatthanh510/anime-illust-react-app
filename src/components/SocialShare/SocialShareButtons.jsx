import React from 'react';
import {
  ShareButtons,
  ShareCounts
} from 'react-share';

class SocialShareButtons extends React.Component {
    constructor() {
        super();
    }

    renderSocialShareButtons = (props) => {
        const {
            FacebookShareButton,
            GooglePlusShareButton,
            LinkedinShareButton,
            TwitterShareButton,
            TelegramShareButton,
            WhatsappShareButton,
            PinterestShareButton,
            VKShareButton,
            OKShareButton,
            RedditShareButton,
        } = ShareButtons;

        const {
            FacebookShareCount,
            GooglePlusShareCount,
            LinkedinShareCount,
            PinterestShareCount,
            VKShareCount,
            OKShareCount,
            RedditShareCount,
        } = ShareCounts;

        let socialButtons = [];

        const faceBookButton = (
            <FacebookShareButton url={props.url}>
                <a href="#" className="socicon-btn socicon-btn-circle socicon-solid bg-facebook font-white bg-hover-blue-steel tooltips" data-original-title="Share to Facebook">
                    <i className="fa fa-facebook"/>
                </a>
            </FacebookShareButton>
        );

        const twitterButton = (
            <TwitterShareButton url={props.url}>
                <a href="#" className="socicon-btn socicon-btn-circle socicon-solid bg-twitter font-white bg-hover-green tooltips" data-original-title="Share to Twitter">
                    <i className="fa fa-twitter"/>
                </a>
            </TwitterShareButton>
        );

        const googlePlusButton = (
            <GooglePlusShareButton url={props.url}>
                <a href="#" className="socicon-btn socicon-btn-circle socicon-solid bg-googleplus font-white bg-hover-red tooltips" data-original-title="Share to Google+">
                    <i className="fa fa-google-plus"/>
                </a>
            </GooglePlusShareButton>
        );

        if (props.facebook) {
            socialButtons.push(faceBookButton);
        }
        if (props.twitter) {
            socialButtons.push(twitterButton);
        }
        if (props.googleplus) {
            socialButtons.push(googlePlusButton);
        }

        return (
            <div className="social-buttons">
                {socialButtons}
            </div>
        );
    }

    render() {
        return (
            this.renderSocialShareButtons(this.props)
        );
    }
}
export default SocialShareButtons;