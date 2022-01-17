import { Stack, IconButton, Button, Container } from "@mui/material";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { EmailEdit } from "./EmailPane";
import { PasswordEdit } from "./PasswordPane";
import { StreamKeyTable } from "./StreamKeyTable";
import CreateIcon from "@mui/icons-material/Create";
import { v4 as uuidv4 } from "uuid";
import { filterByUserId, writeStreamKey } from "../../adapters/stream_key";
import { useState, useEffect } from "react";
import { StreamKeyModel } from "../../models/stream_key";
import { useAuthState } from "../../context/AuthContext";

export function Setting() {
  const maskPassword = "•";

  const { email } = useAuthState();

  const [openPasswordEdit, setOpenPasswordEdit] = useState(false);
  const [streamKeyList, setStreamKeyList] = useState<StreamKeyModel[]>([]);

  // pull the keys
  useEffect(() => {
    async function getKeyList(userId: string) {
      const keyList = await filterByUserId(userId);
      setStreamKeyList(keyList);
    }
    getKeyList(email!);
  }, []);

  // generate a new key, write to database, and append to client side keyList
  const generateStreamKey = () => {
    let streamKey = uuidv4();
    writeStreamKey(email!, streamKey).then(() => {
      const streamKeyModel = new StreamKeyModel(email!, streamKey, new Date());
      setStreamKeyList((oldList) => [...oldList, streamKeyModel]);
    });
  };

  return (
    <div>
      <Navbar />
      <Stack>
        <span>
          Email: test@muxable.com
          <IconButton disableRipple={true} onClick={() => {}}>
            <CreateIcon />
          </IconButton>
        </span>
        <span>
          Password: {maskPassword.repeat(5)}
          <IconButton
            disableRipple={true}
            onClick={() => {
              setOpenPasswordEdit(!openPasswordEdit);
            }}
          >
            <CreateIcon />
          </IconButton>
          {openPasswordEdit && (
            <PasswordEdit setOpenPasswordEdit={setOpenPasswordEdit} />
          )}
        </span>
        <Button
          variant="contained"
          color="primary"
          onClick={() => generateStreamKey()}
        >
          Generate a stream key
        </Button>
        <StreamKeyTable streamKeyList={streamKeyList} />
      </Stack>
      <Footer />
    </div>
  );
}
