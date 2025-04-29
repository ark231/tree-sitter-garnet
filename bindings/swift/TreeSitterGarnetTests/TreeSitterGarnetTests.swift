import XCTest
import SwiftTreeSitter
import TreeSitterGarnet

final class TreeSitterGarnetTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_garnet())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Garnet grammar")
    }
}
