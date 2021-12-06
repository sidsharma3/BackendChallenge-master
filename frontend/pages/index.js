import Layout from '../components/Layout';
import Link from 'next/link';

const Index = () => {
    return (
        <Layout>
            <article className="overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-4 font-weight-bold">
                                Welcome to the Image Repository Click on Images to View Images
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-md-12">
                            <div className="flip flip-horizontal">
                                <div
                                    className="front"
                                    style={{
                                        height: "100vh",
                                        backgroundImage:
                                            'url(' +
                                            'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
                                            ')'
                                    }}
                                >
                                    <h2 className="text-shadow text-center h1">View Images!</h2>
                                </div>
                                <div className="back text-center">
                                    <Link href="/submissions">
                                        <a>
                                            <h3 className="h1">View Images!</h3>
                                        </a>
                                    </Link>
                                    <h2>
                                        Images with a title, body, tag and categories!
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Layout>
    );
};

export default Index;