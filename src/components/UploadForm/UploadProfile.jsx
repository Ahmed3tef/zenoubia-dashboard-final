import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAdmin } from "../../store/reducers/admin";
import MiniText from "./MiniText";
import uploadAndEdit from "./upload-edit";
import UploadProfileImg from "./UploadProfileImg";
import { useTranslation } from "react-i18next";

const UploadProfile = () => {
  const { t } = useTranslation();
  const adminData = useSelector((state) => state.admin.admin);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  useEffect(() => {
    if (token) dispatch(loadAdmin(token));
  }, [token]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [img, setImg] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (adminData) {
      setName(adminData.name);
      setPhone(adminData.phone);
      setImg(adminData.imageUrl);
    }
  }, [adminData]);

  const uploadADHandler = () => {
    const fd = new FormData();

    const config = {
      headers: {
        Authorization: token,
      },
    };

    if (img) fd.append("image", img);
    if (name) fd.append("name", name);
    if (phone) fd.append("phone", phone);
    if (password) fd.append("password", password);
    uploadAndEdit(true, "admin", fd, config, false, "Your Profile");
    dispatch(loadAdmin(token));
  };

  return (
    <div className="profile-container">
      <div className="profile-img">
        <UploadProfileImg profile={true} existingImg={img} setImg={setImg} />
      </div>
      <form className="profile-input">
        <MiniText
          classes="mb-5"
          placeholder={t("userNamePlaceholder")}
          label={t("userName")}
          setName={setName}
          name={name}
        />

        {/* <MiniText
          type='phone'
          classes='mb-5'
          placeholder={t('phonePlaceholder')}
          label={t('phone')}
          setName={setPhone}
          name={phone}
        /> */}

        <MiniText
          type="text"
          placeholder={t("passwordPlaceholder")}
          label={t("newPassword")}
          setName={setPassword}
          name={password}
        />

        <div className="form-btns mt-5 mx-auto">
          <div className="form-btn" onClick={uploadADHandler}>
            {t("save")}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadProfile;
