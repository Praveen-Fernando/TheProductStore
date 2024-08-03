import Authentication from "../../auth/Authentication";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainSideBar from "./MainSideBar";
import { UserService } from "../../service/UserService";


export default function Profile() {
  const { profileInfo } = Authentication();
  const navigate = useNavigate();
  //const {token } = useParams();
  const token = localStorage.getItem("token");

  const deleteUser = async (user_id) => {
    try {
      // Prompt for confirmation before deleting the user
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmDelete) {
        const token = localStorage.getItem("token");
        await UserService.deleteUser(token);
        window.location.reload();
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div class="max-w-screen-xl items-center  mx-auto p-4">
      <div className="flex flex-col p-4 lg:flex-row">
        <MainSideBar />
        <div className="w-full p-4 bg-white rounded-lg shadow-lg lg:w-3/4">
          <div className="">
            <div className="flex justify-between p-0 bg-white ">
              <h2 className="mb-4 text-2xl font-bold">My Profile</h2>
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <Link to={`/update-user/${token}`}>Edit Profile</Link>
              </button>
            </div>
            <div class="gap-4">
              <div class="grid grid-cols-1 gap-4 place-content-stretch border bottom-3 p-2 h-fit">
                <div class="border-t border-gray-100 px-4 py-5 sm:p-0">
                  <dl class="sm:divide-y sm:divide-gray-200">
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Full name
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {profileInfo.name}
                      </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {profileInfo.email}
                      </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Phone number
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {profileInfo.contact}
                      </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Date of Birth
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {profileInfo.dob}
                      </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Gender</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {profileInfo.gender}
                      </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Address</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {profileInfo.address}
                      </dd>
                    </div>
                  </dl>
                  <br />
                </div>
              </div>

              <div className="p-4 bg-white ">
                <h2 className="mb-4 text-2xl font-bold">Delete Profile</h2>
              </div>
              <div class="grid grid-cols-1 gap-4 place-content-stretch border bottom-3 p-2 h-fit">
                <div class="border-t border-gray-100 px-4 py-5 sm:p-0">
                  <dl class="sm:divide-y sm:divide-gray-200">
                    <div class="py-3 sm:py-5  sm:gap-4 sm:px-6">
                      <h1 class="text-xl font-bold mb-4 text-gray-800">
                        Account Deletion Notice
                      </h1>

                      <h2 class="text-xl font-semibold mb-2 text-gray-700">
                        What You Will Lose:
                      </h2>
                      <ul class="list-disc list-inside pl-4 mb-6">
                        <li class="mb-2 text-gray-600">
                          All your personal data and account information will be
                          permanently deleted.
                        </li>
                        <li class="mb-2 text-gray-600">
                          Access to your order history and tracking information.
                        </li>
                        <li class="mb-2 text-gray-600">
                          Any saved shipping addresses and payment methods.
                        </li>
                        <li class="mb-2 text-gray-600">
                          Your wishlist and any saved items in your shopping
                          cart.
                        </li>
                        <li class="mb-2 text-gray-600">
                          Access to any exclusive member discounts, offers, or
                          rewards.
                        </li>
                        <li class="mb-2 text-gray-600">
                          Any store credits, gift cards, or loyalty points
                          associated with your account.
                        </li>
                        <li class="mb-2 text-gray-600">
                          All messages and communications with customer support.
                        </li>
                      </ul>

                      <h2 class="text-xl font-semibold mb-2 text-gray-700">
                        Your Responsibilities:
                      </h2>
                      <ul class="list-disc list-inside pl-4 mb-6">
                        <li class="mb-2 text-gray-600">
                          Ensure you have backed up any important data or
                          information before proceeding.
                        </li>
                        <li class="mb-2 text-gray-600">
                          Be aware that this action is irreversible and your
                          account cannot be recovered.
                        </li>
                        <li class="mb-2 text-gray-600">
                          Understand that deleting your account will cancel any
                          active orders and ongoing subscriptions.
                        </li>
                        <li class="mb-2 text-gray-600">
                          Settle any outstanding payments or obligations prior
                          to account deletion.
                        </li>
                        <li class="mb-2 text-gray-600">
                          Note that you may lose access to any refunds, credits,
                          or rewards linked to your account.
                        </li>
                      </ul>

                      <p class="text-gray-600">
                        If you have any questions or need assistance, please
                        contact our customer support team before proceeding.
                      </p>
                    </div>
                  </dl>
                  <br />
                  <button
                    type="button"
                    onClick={() => deleteUser(profileInfo.user_id)}
                    class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-900 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Delete Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
