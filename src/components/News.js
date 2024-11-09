import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=>{
    const[articles,setArticles] =useState([])
    const[loading,setLoading] =useState(true)
    const[page,setPage] =useState(1)
    const[totalResults,setTotalResult] =useState(0)
    const capitalize = (str)=> {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
        
    // document.title= `${capitalize(props.category)} - News Buster`;
    const updateNews=async()=>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResult(parsedData.totalResults)
        setLoading(false)

        props.setProgress(100);
    }
    useEffect(()=>{
        updateNews();
    })
    
    const handlePrevclick= async ()=>{
        // console.log("Previous");

        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=af5fbf30f06e4bc7a7de51f303267f9e&page=${state.page - 1}&pageSize=${props.pageSize}`;
        // setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // setState({articles:parsedData.articles});
        // setState({
        //     page:state.page - 1,
        //     articles: parsedData.articles,
        //     loading:false
        // })
        setPage(page-1);
        updateNews();
    }
    const handleNextclick= async ()=>{
        // console.log("Next"); 
        // if(!(state.page +1 > Math.ceil(state.totalResults/props.pageSize))){
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=af5fbf30f06e4bc7a7de51f303267f9e&page=${state.page + 1}&pageSize=${props.pageSize}`;
        // setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // setState({articles:parsedData.articles});
        // setState({
        //     page:state.page + 1,
        //     articles: parsedData.articles,
        //     loading:false
        // })
        // }
        setPage(page+1);
        updateNews();
    }
    const fetchMoreData=async ()=>{
        setPage(page+1);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResult(parsedData.totalResults)
    };

    return (
        <>
        <h1 className="text-center" style={{margin: '35px 0px'}}>News Buster - Top {capitalize(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>}
        >
            <div className="container">
            <div className="row">
                {articles.map((element) => {
                      return <div className="col-md-4" key={element.url}>
                        <NewsItem
                            title={element.title?element.title:""}
                            description={element.description?element.description:""}
                            imageUrl={element.urlToImage}
                            newsUrl={element.url}
                            author={element.author}
                            date={element.publishedAt}
                            source={element.source.name}
                        />
                    </div>
                })};
            </div>
            </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
                <button disabled={state.page<=1} type="button" onClick={handlePrevclick} className="btn btn-dark">&larr; Previous</button>
                <button disabled={state.page +1 > Math.ceil(state.totalResults/props.pageSize)}type="button" onClick={handleNextclick} className="btn btn-dark">Next &rarr;</button>
        </div> */}
    </>
    );
}

News.defaultProps ={
    country:"in",
    pageSize:8,
    category:'general'
}
News.propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string
}
export default News;
