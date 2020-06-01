import React from "react";
import { render } from "@testing-library/react";
import AnimalList from "./AnimalList";
import NewsFakeService from "../Services/NewsFakeService";


describe("AnimalList", () => {

    test("Shows a message before loading results", () => {
        const newsService = new NewsFakeService();

        const { getByText } = render(<AnimalList newsService={newsService} />);
        const linkElement = getByText(/No results found/i);
        expect(linkElement).toBeInTheDocument();
    });

    test("Shows the loaded results", async() => {
        const newsService = new NewsFakeService();

        const { findByText } = render(<AnimalList newsService={newsService} />);
        const linkElement = await findByText(/News 1/i);
        expect(linkElement).toBeInTheDocument();
    });

});

