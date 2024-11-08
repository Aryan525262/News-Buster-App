import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title,description,imageUrl,newsUrl,author,date,source} =this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <div style={{display:"flex",
                        justifyContent:"flex-end",
                        position:"absolute",
                        right:"0"
                    }}
                    >
                    <span className='badge rounded-pill bg-danger'>{source}</span>
                    </div>
                    <img src={!imageUrl?"https://images.axios.com/saA-U-_XMWQ6HJzZBCK8xctcKbo=/0x0:1600x900/1366x768/2024/10/31/1730395550062.png":imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}.....</h5>
                            <p className="card-text">{description}......Read more</p>
                            <p className='card-text'><small class='text-muted'>By{!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
                            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">Go somewhere</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
