from pydantic import BaseModel


class PhotoModel(BaseModel):
    patient_name: str
    clinician_name: str
    # image_id: int
    # image_name: str
    image_file_url: str
    is_deleted: bool

    def set_image_file_url(self, image_file_url: str):
        self.image_file_url = image_file_url
        return self

    # def set_image_name(self, image_name: str):
    #     self.image_name = image_name
    #     return self

    # def set_image_id(self, image_id: str):
    #     self.image_id = image_id
    #     return self

    class Config:
        orm_mode = True
