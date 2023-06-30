import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const News = () => {
  const [newsData, setNewsData] = useState({
    usNews: [],
    bbcNews: [],
    germanyNews: [],
    trumpNews: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    try {
      const usUrl =
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=7ae135b0987a4878b477cf04f74d548b";
      const bbcUrl =
        "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=7ae135b0987a4878b477cf04f74d548b";
      const germanyUrl =
        "https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=7ae135b0987a4878b477cf04f74d548b";
      const trumpUrl =
        "https://newsapi.org/v2/top-headlines?q=trump&apiKey=7ae135b0987a4878b477cf04f74d548b";

      const responseUS = await fetch(usUrl);
      const dataUS = await responseUS.json();

      const responseBBC = await fetch(bbcUrl);
      const dataBBC = await responseBBC.json();

      const responseGermany = await fetch(germanyUrl);
      const dataGermany = await responseGermany.json();

      const responseTrump = await fetch(trumpUrl);
      const dataTrump = await responseTrump.json();

      setNewsData({
        usNews: dataUS.articles,
        bbcNews: dataBBC.articles,
        germanyNews: dataGermany.articles,
        trumpNews: dataTrump.articles,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="news-app">
      <Container className="mt-5">
        <h1 className="text-center mb-5">News Headlines</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Row>
            <Col md={4} sm={6}>
              <Card className="custom-card bg-primary">
                <Card.Header className="custom-card-header text-white">
                  Headlines from US
                </Card.Header>
                <Card.Body>
                  <ul className="list-unstyled">
                    {newsData.usNews.map((news) => (
                      <li key={news.title}>{news.title}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} sm={6}>
              <Card className="custom-card bg-secondary">
                <Card.Header className="custom-card-header text-white">
                  Headlines from BBC
                </Card.Header>
                <Card.Body>
                  <ul className="list-unstyled">
                    {newsData.bbcNews.map((news) => (
                      <li key={news.title}>{news.title}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} sm={6}>
              <Card className="custom-card bg-info">
                <Card.Header className="custom-card-header text-white">
                  Headlines from Germany
                </Card.Header>
                <Card.Body>
                  <ul className="list-unstyled">
                    {newsData.germanyNews.map((news) => (
                      <li key={news.title}>{news.title}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
        {!loading && (
          <Row className="justify-content-center mt-5">
            <Col xs={12} sm={10} md={8} lg={6} className="text-center">
              <Card className="custom-card bg-dark text-white">
                <Card.Header className="custom-card-header">
                  Headlines related to Trump
                </Card.Header>
                <Card.Body>
                  <ul className="list-unstyled">
                    {newsData.trumpNews.map((news) => (
                      <li key={news.title}>{news.title}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default News;
