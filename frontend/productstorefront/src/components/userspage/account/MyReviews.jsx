import MainSideBar from "./MainSideBar";

export default function MyReviews() {
  return (
    <div class="max-w-screen-xl items-center  mx-auto p-4">
      <div className="flex flex-col p-4 lg:flex-row">
        <MainSideBar />
        <div className="w-full p-4 bg-white rounded-lg shadow-lg lg:w-3/4">
          <h1>My Reviews </h1>
        </div>
      </div>
    </div>
  );
}
