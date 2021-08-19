import React from 'react';

class Footer extends React.Component {

    render() {
        return (

                    <div>
                    <div className="alert alert-info visible-sm visible-xs">
                      <button type="button" className="close" data-dismiss="alert">
                        <i className="ace-icon fa fa-times" />
                      </button>
                      Please note that
                      <span className="blue bolder">top menu style</span>
                      is visible only in devices larger than
                      <span className="blue bolder">991px</span>
                      which you can change using CSS builder tool.
                    </div>
                    <div className="well well-sm visible-sm visible-xs">
                      Top menu can become any of the 3 mobile view menu styles:
                      <em>default</em>
                      ,
                      <em>collapsible</em>
                      or
                      <em>minimized</em>.
                    </div>

          <br /><br /><br />
          <div className="footer">
            <div className="footer-inner">
              <div className="footer-content">
                <div style={{ padding: 0 }}>
                  Copyright © 2018 Telekom Malaysia Berhad (128740-P) ALL RIGHTS RESERVED</div>
                <div style={{ padding: 0 }}>For the best viewing experience, please use either Mozilla Firefox or IE browser with resolution at 1280 x 800 pixels and above</div>
                {/*&nbsp; &nbsp;
						<span class="action-buttons">
							<a href="#">
								<i class="ace-icon fa fa-twitter-square light-blue bigger-150"></i>
							</a>

							<a href="#">
								<i class="ace-icon fa fa-facebook-square text-primary bigger-150"></i>
							</a>

							<a href="#">
								<i class="ace-icon fa fa-rss-square orange bigger-150"></i>
							</a>
						</span> */}
              </div>
            </div>
          </div>
          <a href="#" id="btn-scroll-up" className="btn-scroll-up btn btn-sm btn-inverse">
            <i className="ace-icon fa fa-angle-double-up icon-only bigger-110" />
          </a>
          </div>

        );
    }

}

export default Footer;