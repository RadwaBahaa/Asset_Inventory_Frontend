import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const ItemsAssets = React.lazy(() => import("../pages/Items/Assets"));
const ItemsCategories = React.lazy(() => import("../pages/Items/Categories"));
const Location = React.lazy(() => import("../pages/Location"));
const TrackingStartProgress = React.lazy(() =>
  import("../pages/Tracking/StartProgress")
);
const TrackingViewTracking = React.lazy(() =>
  import("../pages/Tracking/ViewTracking")
);
const Members = React.lazy(() => import("../pages/Members"));
const Reports = React.lazy(() => import("../pages/Reports"));

const AddNewAssets = React.lazy(() => import("../pages/AddNew/Assets"));
const AddNewCategories = React.lazy(() => import("../pages/AddNew/Categories"));
const AddNewRequests = React.lazy(() => import("../pages/AddNew/Requests"));
const AddNewLocation = React.lazy(() => import("../pages/AddNew/Location"));

const UserViewProfile = React.lazy(() => import("../pages/User/ViewProfile"));
const AddNewSettings = React.lazy(() => import("../pages/User/Settings"));

const AlertMessages = React.lazy(() => import("../pages/Alert/Messages"));
const AlertPurchaseRequests = React.lazy(() =>
  import("../pages/Alert/PurchaseRequests")
);

function RouteConfige() {
  return (
    <Suspense fallback={<h4>Loading...</h4>}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/items/assets" element={<ItemsAssets />} />
        <Route path="/items/categories" element={<ItemsCategories />} />
        <Route path="/location" element={<Location />} />
        <Route
          path="/tracking/startProgress"
          element={<TrackingStartProgress />}
        />
        <Route
          path="/tracking/viewTracking"
          element={<TrackingViewTracking />}
        />
        <Route path="/members" element={<Members />} />
        <Route path="/reports" element={<Reports />} />

        <Route path="/addNew/assets" element={<AddNewAssets />} />
        <Route path="/addNew/categories" element={<AddNewCategories />} />
        <Route path="/addNew/requests" element={<AddNewRequests />} />
        <Route path="/addNew/location" element={<AddNewLocation />} />

        <Route path="/user/viewprofile" element={<UserViewProfile />} />
        <Route path="/user/settings" element={<AddNewSettings />} />

        <Route path="/alert/messages" element={<AlertMessages />} />
        <Route
          path="/alert/purchaserequests"
          element={<AlertPurchaseRequests />}
        />
      </Routes>
    </Suspense>
  );
}
export default RouteConfige;
