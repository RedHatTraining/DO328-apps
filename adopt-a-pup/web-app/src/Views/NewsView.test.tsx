import React from "react";
import { render } from "@testing-library/react";
import NewsView from "./NewsView";
import NewsFakeService from "../Services/NewsFakeService";


describe("NewsView", () => {

    test("Shows a message before loading results", () => {
        const newsService = new NewsFakeService();

        const { getByText } = render(<NewsView newsService={newsService} />);
        const linkElement = getByText(/No results found/i);
        expect(linkElement).toBeInTheDocument();
    });

    test("Shows the loaded results", async() => {
        const newsService = new NewsFakeService();

        const { findByText } = render(<NewsView newsService={newsService} />);
        const linkElement = await findByText(/News 1/i);
        expect(linkElement).toBeInTheDocument();
    });

});

