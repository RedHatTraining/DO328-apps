import React from "react";
import { render } from "@testing-library/react";
import NewsBoard from "./NewsBoard";
import NewsFakeService from "../Services/NewsFakeService";


describe("NewsBoard", () => {

    test("Shows a message before loading results", () => {
        const newsService = new NewsFakeService();

        const { getByText } = render(<NewsBoard newsService={newsService} />);
        const linkElement = getByText(/No results found/i);
        expect(linkElement).toBeInTheDocument();
    });

    test("Shows the loaded results", async() => {
        const newsService = new NewsFakeService();

        const { findByText } = render(<NewsBoard newsService={newsService} />);
        const linkElement = await findByText(/News 1/i);
        expect(linkElement).toBeInTheDocument();
    });

});

