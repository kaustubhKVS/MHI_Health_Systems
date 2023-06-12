from pydantic import BaseModel


class PhotoModel(BaseModel):
    patient_id: int
    clinician_id: int
    record_id: int
    image_name_key: str
    image_file_url: str

    def set_image_file_url(self, image_file_url: str):
        self.image_file_url = image_file_url
        return self

    def set_image_name_key(self, image_name_key: str):
        self.image_name_key = image_name_key
        return self

    # def set_image_id(self, image_id: str):
    #     self.image_id = image_id
    #     return self

    class Config:
        orm_mode = True
