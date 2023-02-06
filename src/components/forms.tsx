function Forms() {
    return (
        <form className="stack">
            <fieldset id="forms__input" className="stack">
                <legend>Input fields</legend>
                <p>
                    <label htmlFor="input__text">Text Input</label>
                    <input
                        id="input__text"
                        type="text"
                        placeholder="Text Input"
                    />
                </p>
                <p>
                    <label htmlFor="input__password">
                        Password
                    </label>
                    <input
                        id="input__password"
                        type="password"
                        placeholder="Type your Password"
                    />
                </p>
                <p>
                    <label htmlFor="input__webaddress">
                        Web Address
                    </label>
                    <input
                        id="input__webaddress"
                        type="url"
                        placeholder="http://yoursite.com"
                    />
                </p>
                <p>
                    <label htmlFor="input__emailaddress">
                        Email Address
                    </label>
                    <input
                        id="input__emailaddress"
                        type="email"
                        placeholder="name@email.com"
                    />
                </p>
                <p>
                    <label htmlFor="input__phone">
                        Phone Number
                    </label>
                    <input
                        id="input__phone"
                        type="tel"
                        placeholder="(999) 999-9999"
                    />
                </p>
                <p>
                    <label htmlFor="input__search">Search</label>
                    <input
                        id="input__search"
                        type="search"
                        placeholder="Enter Search Term"
                    />
                </p>
                <p>
                    <label htmlFor="input__text2">
                        Number Input
                    </label>
                    <input
                        id="input__text2"
                        type="number"
                        placeholder="Enter a Number"
                    />
                </p>
                <p>
                    <label htmlFor="input__text3">Error</label>
                    <input
                        id="input__text3"
                        type="text"
                        placeholder="Text Input"
                    />
                </p>
                <p>
                    <label htmlFor="input__text4">Valid</label>
                    <input
                        id="input__text4"
                        type="text"
                        placeholder="Text Input"
                    />
                </p>
            </fieldset>
            <fieldset id="forms__select" className="stack">
                <legend>Select menus</legend>
                <p>
                    <label htmlFor="select">Select</label>
                    <select id="select">
                        <optgroup label="Option Group">
                            <option>Option One</option>
                            <option>Option Two</option>
                            <option>Option Three</option>
                        </optgroup>
                    </select>
                </p>
                <p>
                    <label htmlFor="select-multiple">Select</label>
                    <select id="select-multiple" multiple>
                        <optgroup label="Option Group">
                            <option>Option One</option>
                            <option>Option Two</option>
                            <option>Option Three</option>
                        </optgroup>
                    </select>
                </p>
            </fieldset>
            <fieldset id="forms__checkbox" className="stack">
                <legend>Checkboxes</legend>
                <ul>
                    <li>
                        <label htmlFor="checkbox1">
                            <input
                                id="checkbox1"
                                name="checkbox"
                                type="checkbox"
                                defaultChecked
                            />{" "}
                            Choice A
                        </label>
                    </li>
                    <li>
                        <label htmlFor="checkbox2">
                            <input
                                id="checkbox2"
                                name="checkbox"
                                type="checkbox"
                            />{" "}
                            Choice B
                        </label>
                    </li>
                    <li>
                        <label htmlFor="checkbox3">
                            <input
                                id="checkbox3"
                                name="checkbox"
                                type="checkbox"
                            />{" "}
                            Choice C
                        </label>
                    </li>
                </ul>
            </fieldset>
            <fieldset id="forms__radio" className="stack">
                <legend>Radio buttons</legend>
                <ul>
                    <li>
                        <label htmlFor="radio1">
                            <input
                                id="radio1"
                                name="radio"
                                type="radio"
                                defaultChecked
                            />{" "}
                            Option 1
                        </label>
                    </li>
                    <li>
                        <label htmlFor="radio2">
                            <input
                                id="radio2"
                                name="radio"
                                type="radio"
                            />{" "}
                            Option 2
                        </label>
                    </li>
                    <li>
                        <label htmlFor="radio3">
                            <input
                                id="radio3"
                                name="radio"
                                type="radio"
                            />{" "}
                            Option 3
                        </label>
                    </li>
                </ul>
            </fieldset>
            <fieldset id="forms__textareas" className="stack">
                <legend>Textareas</legend>
                <p>
                    <label htmlFor="textarea">Textarea</label>
                    <textarea
                        id="textarea"
                        rows={8}
                        cols={48}
                        placeholder="Enter your message here"
                    ></textarea>
                </p>
            </fieldset>
            <fieldset id="forms__html5" className="stack">
                <legend>HTML5 inputs</legend>
                <p>
                    <label htmlFor="ic">Color input</label>
                    <input
                        type="color"
                        id="ic"
                        defaultValue="#000000"
                    />
                </p>
                <p>
                    File input <input type="file" />
                </p>
                <p>
                    <label htmlFor="in">Number input</label>
                    <input
                        type="number"
                        id="in"
                        min="0"
                        max="10"
                        defaultValue="5"
                    />
                </p>
                <p>
                    <label htmlFor="ir">Range input</label>
                    <input type="range" id="ir" defaultValue="10" />
                </p>
                <p>
                    <label htmlFor="ir">Progress input</label>
                    <progress></progress>
                    <progress defaultValue=".5">50%</progress>
                </p>
                <p>
                    <label htmlFor="idd">Date input</label>
                    <input
                        type="date"
                        id="idd"
                        defaultValue="1970-01-01"
                    />
                </p>
                <p>
                    <label htmlFor="idm">Month input</label>
                    <input
                        type="month"
                        id="idm"
                        defaultValue="1970-01"
                    />
                </p>
                <p>
                    <label htmlFor="idw">Week input</label>
                    <input
                        type="week"
                        id="idw"
                        defaultValue="1970-W01"
                    />
                </p>
                <p>
                    <label htmlFor="idt">Datetime input</label>
                    <input
                        type="datetime"
                        id="idt"
                        defaultValue="1970-01-01T00:00:00Z"
                    />
                </p>
                <p>
                    <label htmlFor="idtl">
                        Datetime-local input
                    </label>
                    <input
                        type="datetime-local"
                        id="idtl"
                        defaultValue="1970-01-01T00:00"
                    />
                </p>
            </fieldset>
            <fieldset id="forms__action" className="stack">
                <legend>Action buttons</legend>
                <p>
                    <input
                        type="submit"
                        defaultValue="&lt;input type=submit&gt;"
                    />
                    <input
                        type="button"
                        defaultValue="&lt;input type=button&gt;"
                    />
                    <input
                        type="reset"
                        defaultValue="&lt;input type=reset&gt;"
                    />
                    <input
                        type="submit"
                        defaultValue="&lt;input disabled&gt;"
                        disabled
                    />
                </p>
                <br></br>
                <p>
                    <button type="submit">
                        &lt;button type=submit&gt;
                    </button>
                    <button type="button">
                        &lt;button type=button&gt;
                    </button>
                    <button type="reset">
                        &lt;button type=reset&gt;
                    </button>
                    <button type="button" disabled>
                        &lt;button disabled&gt;
                    </button>
                </p>
            </fieldset>
        </form>
    )
}

export { Forms }
