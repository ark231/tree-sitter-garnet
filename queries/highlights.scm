"func" @keyword
"return" @keyword
"var" @keyword
"let" @keyword
(type) @type
(integer_literal) @number
(floating_point_literal) @number
(oneline_comment) @comment
(multiline_comment) @comment
(function_definition name: (identifier) @function)
(variable_declaration name: (identifier) @variable)
(variable_reference_expression) @variable
