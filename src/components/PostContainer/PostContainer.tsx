import GridLayout from "../Grid/GridLayout";
import { PostList } from "../PostList";

export const PostsContainer = () => {
  return (
    <>
      <h1>Post List</h1>
      <GridLayout>
        <PostList />
      </GridLayout>
    </>
  );
};
