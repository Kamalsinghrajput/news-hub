import NewsCard from "./NewsCard";

const News = ({articles}) => {
  
  return (
    <div className="col-span-9">
      <div className="space-y-6">
        {articles?.map((article, index) => {
            return <NewsCard {...article} key={index} />;
        })}
      </div>
    </div>
  );
};

export default News;
