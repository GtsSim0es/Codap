import React, { useContext } from "react";
import HighlightText from "@sanar/react-native-highlight-text";
import { AppContext } from '../../common/Contexts/AppContext';

/* class AHighlighter extends Component {
    render() {
        const { font, defaultSize = 20, highlight, wordHighlight, text, style } = this.props;
        return (
            <HighlightText
                style={[style, { fontSize: font + defaultSize }]}
                highlightStyle={highlight}
                searchWords={wordHighlight}
                textToHighlight={text}
            />
        );
    }
};

const mapStateToProps = state => ({
    font: state.count.count,
});
const ActionCreators = Object.assign(
    {},
    { changeCount },
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AHighlighter) */

function AHighlighter({defaultSize = 20, ...props}) {
    const { FontSize } = useContext(AppContext);

    return (
        <HighlightText
            style={[props.style, { fontSize: FontSize + defaultSize }]}
            highlightStyle={props.highlight}
            searchWords={props.wordHighlight.map(word => `\\b${word}\\b|(?<=<)${word}(?=>)`)}
            textToHighlight={props.text}
        />
    );
}

export default AHighlighter;