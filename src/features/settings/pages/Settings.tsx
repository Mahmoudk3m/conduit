import LogoutButton from "../components/LogoutButton";
import SettingsForm from "../components/SettingsForm";

export default function Settings() {
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <SettingsForm />
            <hr />
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
