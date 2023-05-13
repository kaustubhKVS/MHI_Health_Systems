from pydantic import BaseModel


class PhotoModel(BaseModel):
    image_id: int
    image_name: str
    image_file_url: str
    creator_name: str
    is_deleted: bool
