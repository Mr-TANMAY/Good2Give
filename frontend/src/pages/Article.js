// src/pages/Article.js
import React from 'react';
import './Article.css';

const articles = [
    {
        title: "Government Initiatives to Combat Food Waste",
        description: "Reviews government policies and programs aimed at reducing food waste.",
        link: "https://www.makeinindia.com/6-schemes-would-reduce-food-waste-benefit-farmers"
    },
    {
        title: "Innovative Solutions for Food Waste in India",
        description: "Highlights innovative technologies and practices being adopted to reduce food waste.",
        link: "https://www.weforum.org/agenda/2023/12/innovations-to-reduce-food-waste/"
    },
    {
        title: "The Future of Food Waste Reduction in India",
        description: "Looks ahead to potential future developments and challenges in the fight against food waste.",
        link: "https://timesofagriculture.in/food-wastage-in-india-farm-to-bin/"
    },
    {
        title: "The Impact of Food Waste on Rural Livelihoods",
        description: "Discusses how food waste affects the livelihoods of farmers and rural communities.",
        link: "https://www.devex.com/news/banking-on-food-waste-to-help-india-feed-struggling-families-106059"
    },
    {
        title: "Community-Based Solutions for Food Waste",
        description: "Highlights grassroots initiatives and community-driven approaches to reducing food waste.",
        link: "https://www.ecoideaz.com/expert-corner/what-india-must-do-to-tackle-its-food-waste-management-issue"
    },
    {
        title: "The Role of Technology in Food Waste Prevention",
        description: "Discusses how technology can be used to monitor food stocks, optimize supply chains, and reduce waste.",
        link: "https://www.dbs.com/livemore/food/why-our-food-supply-chain-is-flawed-and-these-champions-efforts-to-stop-the-waste.html"
    },
    {
        title: "Consumer Behavior and Food Waste",
        description: "Analyzes how consumer habits and attitudes contribute to food waste.",
        link: "https://www.businesstoday.in/latest/economy/story/consumers-have-become-more-conscious-about-food-wastage-post-pandemic-says-capgemini-study-338365-2022-06-20"
    },
    {
        title: "Food Waste Management Practices in Indian Cities",
        description: "Examines the effectiveness of waste management systems in urban areas.",
        link: "https://www.avristech.com/food-waste-management-in-india/"
    },
    {
        title: "The Role of Startups in Reducing Food Waste",
        description: "Explores the contributions of startups and social enterprises in addressing the food waste problem.",
        link: "https://yourstory.com/2022/03/startup-wastelink-food-waste-management-sustainable-animal-feed"
    },
    {
        title: "From Farm to Fork: Reducing Food Losses in India's Supply Chain",
        description: "Discusses strategies to minimize food waste at various stages of the agricultural supply chain.",
        link: "https://www.dbs.com/livemore/food/why-our-food-supply-chain-is-flawed-and-these-champions-efforts-to-stop-the-waste.html"
    },
    {
        title: "Food Waste and Climate Change: A Deadly Duo",
        description: "Examines the environmental impact of food waste, including its contribution to climate change.",
        link: "https://swachhindia.ndtv.com/food-wastage-its-link-to-greenhouse-gases-and-climate-change-a-quick-lowdown-86564/"
    },
    {
        title: "The Economic Cost of Food Waste",
        description: "Quantifies the financial burden of food waste on India's economy.",
        link: "https://timesofagriculture.in/food-wastage-in-india-farm-to-bin/"
    }
];

const Article = () => (
    <div className="article-container">
        <h1>Articles on Food Waste</h1>
        <div className="article-list">
            {articles.map((article, index) => (
                <div className="article-item" key={index}>
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                    <a href={article.link} className="read-more" target="_blank" rel="noopener noreferrer">
                        Read More
                    </a>
                </div>
            ))}
        </div>
    </div>
);

export default Article;
