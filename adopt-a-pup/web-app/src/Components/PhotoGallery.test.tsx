import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import PhotoGallery from "./PhotoGallery";


describe("PhotoGallery", () => {

    let component: ShallowWrapper;
    let photos: string[];

    beforeEach(() => {
        photos = ["photo1.png", "photo2.png"];
        component = shallow(<PhotoGallery photos={photos} selectedPhotoIndex={0} onPhotoSelect={() => {}} />);
    });

    test("Renders photos", () => {
        const imgs = component.find("img");

        expect(imgs).toHaveLength(2);
        expect(imgs.first().prop("src")).toBe("photo1.png");
        expect(imgs.last().prop("src")).toBe("photo2.png");
    });


    test("Renders selected photo", () => {
        component = shallow(<PhotoGallery photos={photos} selectedPhotoIndex={1} onPhotoSelect={() => {}} />);

        expect(component.find("CardBody").last().hasClass("selected")).toBe(true);
    });

    test("Calls onPhotoSelected when photo card is clicked", () => {
        const onPhotoSelected = jest.fn();

        component = shallow(<PhotoGallery photos={photos} selectedPhotoIndex={1} onPhotoSelect={onPhotoSelected} />);
        component.find("Card").first().simulate("click");

        expect(onPhotoSelected).toHaveBeenCalledWith("photo1.png", 0);
    });

});
