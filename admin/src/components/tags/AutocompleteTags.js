import { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getTags, addTag } from "../../api/document";

export default function FixedTags({ data, onChangeTags }) {
  const [tags, setTags] = useState([]);
  const [tagData, setTagData] = useState([]);

  const getTagsRequest = async () => {
    const tags = await getTags();
    if (tags.length) {
      setTagData(tags.map((tag) => tag.name));
    }
  };
  useEffect(() => {
    getTagsRequest();
  }, []);

  useEffect(() => {
    if (data?.length) setTags(data);
  }, [data]);

  useEffect(() => {
    onChangeTags(tags);
  }, [tags]);

  const onAddTag = async (newTag, newValue) => {
    if (typeof newTag === "string") {
      await addTag(newTag);
    }
    setTags([...newValue]);
  };

  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={[...new Set([...tagData, ...sampleTags])]}
      value={tags}
      freeSolo
      onChange={(event, newValue) => onAddTag(event.target.value, newValue)}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} label="Enter tag" placeholder="Tags" />
      )}
    />
  );
}

const sampleTags = [
  "Digital Art",
  "3D project",
  "Source code",
  "Article",
  "Architecture",
  "Music",
  "Logo",
];
