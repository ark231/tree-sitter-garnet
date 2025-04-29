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
    source_file: $ => repeat(choice($._definition, $._declaration)),
    _definition: $ => choice(
      $.function_definition
    ),
    _declaration: $ => choice(
      // TODO: add variable decl
    ),
    function_definition: $ => seq(
      "func",
      $.identifier,
      $.parameter_list,
      "->",
      $._type,
      $.block
    ),
    identifier: $ => /[a-zA-Z][a-zA-Z0-9_]*/,
    parameter_list: $ => seq(
      "(",
      // TODO: implement
      ")"
    ),
    _type: $ => choice(
      "u8",
      "i8",
      "u16",
      "i16",
      "u32",
      "i32",
      "u64",
      "i64",
      "f32",
      "f64",
      $.identifier
    ),
    block: $ => seq(
      "{",
      // TODO: implment
      "}"
    )
  }
});
