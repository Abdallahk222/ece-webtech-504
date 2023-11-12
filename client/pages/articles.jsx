export async function getStaticProps() {
  const dbarticles = [
    {
      id: "332",
      title: "My article",
      content: "Content of the article.",
      date: "04/10/2022",
      author: "Liz Gringer",
    },
    {
      id: "344",
      title: "My article",
      content: "Content of the article.",
      date: "04/10/2022",
      author: "Liz Gringer",
    },
  ];

  return { props: { dbarticles } };
}

export default function Articles({ dbarticles }) {
  const tableArticle = dbarticles.map((article) => (
    <tr>
      <td>{article.id}</td>
      <td>{article.title}</td>
      <td>{article.content}</td>
      <td>{article.date}</td>
      <td>{article.author}</td>
    </tr>
  ));
  return (
    <div>
      <p className="italic font-bold text-sky-500 dark:text-sky-400">
        YOUR FUTURE ARTICLES
      </p>
      <br></br>
      <table>
        <thead>
          <tr>
            <th colSpan="3">List of Articles</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>id</td>
            <td>title</td>
            <td>content</td>
            <td>date</td>
            <td>author</td>
          </tr>
          {tableArticle}
        </tbody>
      </table>
    </div>
  );
}
