/**
 * @file Garnet grammar for tree-sitter
 * @author ark231
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "garnet",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
