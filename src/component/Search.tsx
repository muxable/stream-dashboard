import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
    position: "absolute",
    margin: "-4px 0px 10px 135px",
  },

  searchBox: {
    display: "flex",
    marginLeft: "20px",
  },

  searchField: {
    width: "185px",
    borderRadius: "25px",
    padding: "18px",
    height: "10px",
    outline: "none",
    border: "1px solid #4752b1",
    backgroundColor: "#b3b3b3",
  },
}));

const Search = () => {
  const classes = useStyles();

  return (
    <div className={classes.searchBox}>
      <input
        type="search"
        className={classes.searchField}
        placeholder="Search"
        onChange={() => {}}
      />
      <IconButton disableRipple={true} className={classes.iconButton}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default Search;
