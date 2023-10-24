import { useRouter } from 'next/router'
const dbarticles = [{
    id: '332',
    title: 'My article',
    content: 'Content of the article.',
    date: '04/10/2022',
    author: 'Liz Gringer'
},
{
  id: '344',
  title: 'My article',
  content: 'Content of the article.',
  date: '04/10/2022',
  author: 'Liz Gringer'
}]

export default function Page({article}) {
    if(!article){
        return <p>Article inexistant</p>
    } else {
        const tableArticle= 
        <tr>
            <td>{article.id}</td>
            <td>{article.title}</td>
            <td>{article.content}</td>
            <td>{article.date}</td>
            <td>{article.author}</td>
        </tr>
        ;
        
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="3">Article</th>
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
}


export async function getStaticPaths() {
    const paths = dbarticles.map(article => ({
        params: { articleId: article.id },
    }));

    return {paths, fallback: false};
}

export async function getStaticProps({ params }) {
    const dbarticles = [{
        id: '332',
        title: 'My article',
        content: 'Content of the article.',
        date: '04/10/2022',
        author: 'Liz Gringer'
    },
    {
      id: '344',
      title: 'My article',
      content: 'Content of the article.',
      date: '04/10/2022',
      author: 'Liz Gringer'
    }]

    const article = dbarticles.find(article => article.id === params.articleId);

    return {props: {article,}};
}