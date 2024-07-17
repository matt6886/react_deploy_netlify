import { useStoreActions } from "easy-peasy";
import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import About from "./About";
import EditPost from "./EditPost";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import useAxiosFetch from "./hooks/useAxiosFetch";

function App() {
  const { isLoading, fetchError, data } = useAxiosFetch(
    "http://localhost:3500/posts"
  );
  const setPosts = useStoreActions((actions) => actions.setPosts);

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);

  return (
    <div className="App">
      <Header title={"React JS Blog"} />
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home isLoading={isLoading} fetchError={fetchError} />
        </Route>
        <Route exact path="/post" component={NewPost} />
        <Route path="/edit/:id" component={EditPost} />
        <Route path="/post/:id" component={PostPage} />
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
