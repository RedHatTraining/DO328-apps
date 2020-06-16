import React, { Component } from "react";
import { Gallery, GalleryItem, Card, CardBody } from "@patternfly/react-core";

interface PhotoGalleryProps {
    photos: string[],
    selectedPhotoIndex?: number,
    onPhotoSelect: (url: string, index: number) => void
}

export default class PhotoGallery extends Component<PhotoGalleryProps> {

    public render() {
        return (
            <Gallery>
                {this.props.photos.map(this.renderPhoto.bind(this))}
            </Gallery>
        );
    }

    private renderPhoto(url: string, index: number) {
        const className = this.props.selectedPhotoIndex === index ? "selected" : "";

        return <GalleryItem key={index}>
            <Card onClick={() => this.props.onPhotoSelect(url, index)}>
                <CardBody className={`clickable ${className}`}>
                    <img src={url} alt={`Example ${index}`} />
                </CardBody>
            </Card>
        </GalleryItem>;
    }
}
