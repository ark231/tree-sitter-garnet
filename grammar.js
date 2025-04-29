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
    source_file: $ => repeat(choice($._definition, $._declaration)),
    _definition: $ => choice(
      $.function_definition,
      $.variable_definition_sentence
    ),
    _declaration: $ => choice(
      $.variable_declaration_sentence
    ),
    function_definition: $ => seq(
      "func",
      field("name", $.identifier),
      field("parameters", $.parameter_list),
      "->",
      field("return_type", $._type),
      field("body", $.block)
    ),
    identifier: $ => /[a-zA-Z][a-zA-Z0-9_]*/,
    parameter_list: $ => seq(
      "(",
      optional(
        seq(
          optional(
            repeat(
              seq(
                $.variable_declaration,
                ","
              )
            ),
          ),
          $.variable_declaration,
        ),
      ),
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
      repeat(
        choice(
          $._comment,
          $._sentence
        )
      ),
      "}"
    ),
    _comment: $ => choice(
      $.oneline_comment,
      $.multiline_comment
    ),
    oneline_comment: $ => /#.*/,
    multiline_comment: $ => /#\*(.|\n)*?\*#/,
    _sentence: $ => choice(
      $.expression_sentence,
      $.variable_declaration_sentence,
      $.variable_definition_sentence,
      $.return_sentence
    ),
    expression_sentence: $ => seq($._expression, ";"),
    variable_declaration_sentence: $ => seq($.variable_declaration, ";"),
    variable_definition_sentence: $ => seq($.variable_definition, ";"),
    _expression: $ => choice(
      $.binary_expresion,
      $._literal,
      $.variable_reference_expression
    ),
    binary_expresion: $ => choice(
      prec.left(1, seq($._expression, "<", $._expression)),
      prec.left(1, seq($._expression, ">", $._expression)),
      prec.left(2, seq($._expression, "=", $._expression)),
      prec.left(3, seq($._expression, "+", $._expression)),
      prec.left(3, seq($._expression, "-", $._expression)),
      prec.left(4, seq($._expression, "*", $._expression)),
      prec.left(4, seq($._expression, "/", $._expression)),
      prec.left(4, seq($._expression, "%", $._expression)),
    ),
    _literal: $ => choice(
      $.integer_literal,
      $.floating_point_literal
    ),
    integer_literal: $ => /\d+/,
    floating_point_literal: $ => /\d+\.\d+/,
    variable_reference_expression: $ => $.identifier,
    variable_declaration: $ => seq(
      choice("var", "let"),
      field("name", $.identifier),
      ":",
      field("type", $._type)
    ),
    variable_definition: $ => seq(
      $.variable_declaration,
      "=",
      $._expression
    ),
    return_sentence: $ => seq(
      "return",
      optional($._expression),
      ";"
    )
  }
});
