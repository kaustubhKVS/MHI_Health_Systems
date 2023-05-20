from pydantic import BaseModel


class PhotoModel(BaseModel):
    image_id: int
    image_name: str
    image_file_url: str
    creator_name: str
    is_deleted: bool

    def set_file_url(self, image_file_url: str):
        self.image_file_url = image_file_url
        return self

    class Config:
        orm_mode = True
