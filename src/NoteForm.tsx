import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "./App";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

const colorOptions = [
  {
    value: "#FCE9FF",
    label: (
      <div
        style={{ backgroundColor: "#FCE9FF", width: "20px", height: "20px" }}
      ></div>
    ),
  },
  {
    value: "#F6FAFF",
    label: (
      <div
        style={{ backgroundColor: "#F6FAFF", width: "20px", height: "20px" }}
      ></div>
    ),
  },
  {
    value: "#EDFFEE",
    label: (
      <div
        style={{ backgroundColor: "#EDFFEE", width: "20px", height: "20px" }}
      ></div>
    ),
  },
  {
    value: "#FEF9ED",
    label: (
      <div
        style={{ backgroundColor: "#FEF9ED", width: "20px", height: "20px" }}
      ></div>
    ),
  },
];

const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  text = "",
  tags = [],
  backgroundColor,
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const [bgColor, setBackgroundColor] = useState<string>(
    backgroundColor ? backgroundColor : "#FCE9FF"
  );

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      text: markdownRef.current!.value,
      tags: selectedTags,
      backgroundColor: bgColor,
    });

    navigate("..");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleBackgroundColorChange = (selectedOption: any) => {
    setBackgroundColor(selectedOption.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label className="text-white">Title</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label className="text-white">Tags</Form.Label>
              <CreatableReactSelect
                isMulti
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label className="text-white">Body</Form.Label>
          <Form.Control
            ref={markdownRef}
            required
            as="textarea"
            rows={15}
            defaultValue={text}
          />
        </Form.Group>
        <Form.Group controlId="backgroundColor">
          <Form.Label className="text-white">
            Select Background Color
          </Form.Label>
          <CreatableReactSelect
            value={colorOptions.find((option) => option.value === bgColor)}
            options={colorOptions}
            onChange={handleBackgroundColorChange}
            styles={{
              control: (provided) => ({
                ...provided,
                width: "200px",
              }),
              menu: (provided) => ({
                ...provided,
                width: "200px",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.data.value,
                width: "20px",
                height: "20px",
                margin: 0,
                padding: 0,
              }),
            }}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button
            type="submit"
            variant="primary"
            style={{ backgroundColor: "#31BFD2", border: "none" }}
          >
            Save
          </Button>
          <Link to="..">
            <Button
              type="button"
              variant="outline-secondary"
              className="text-white"
            >
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;
